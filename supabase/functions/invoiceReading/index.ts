// @ts-ignore - Deno supports URL imports at runtime
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// Declare Deno global for TypeScript
declare const Deno: {
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
  env: {
    get: (key: string) => string | undefined;
  };
};

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };



  // ✅ Handle preflight (CORS)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // 🔐 Extract token
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing JWT" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 🔑 Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
     { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    // ✅ Validate user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid JWT" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Authenticated user:", user.email);

    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    // Get environment variables for Veryfi API
    const API_KEY = Deno.env.get("VERIFY_API_KEY");
    const CLIENT_ID = Deno.env.get("VERIFY_CLIENT_ID");
    const USER_NAME = Deno.env.get("VERIFY_USER");


    console.log("API_KEY:", !!API_KEY, "CLIENT_ID:", !!CLIENT_ID);


    if (!API_KEY || !CLIENT_ID || !USER_NAME) {
      return new Response(
        JSON.stringify({ error: "Missing API credentials" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    // Parse the multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    // Create FormData for Veryfi API
    const veryfiFormData = new FormData();
    veryfiFormData.append("file", file);

    // Call Veryfi API
    const veryfiResponse = await fetch(
      "https://api.veryfi.com/api/v8/partner/documents",
      {
        method: "POST",
        headers: {
          "CLIENT-ID": CLIENT_ID,
          "AUTHORIZATION": `apikey ${USER_NAME}:${API_KEY}`,
          "Accept": "application/json",
        },
        body: veryfiFormData,
      },
    );

    if (!veryfiResponse.ok) {
      const errorText = await veryfiResponse.text();
      console.error("Veryfi API error:", errorText);
      return new Response(
        JSON.stringify({ error: errorText }),
        {
          status: veryfiResponse.status,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const json = await veryfiResponse.json();
    console.log("Veryfi response:", JSON.stringify(json, null, 2));

    return new Response(
      JSON.stringify(json),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );

  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
