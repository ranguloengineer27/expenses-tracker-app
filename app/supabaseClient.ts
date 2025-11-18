import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient, createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let browserClient: SupabaseClient | null = null;
let serverClient: SupabaseClient | null = null;

export async function createClient(): Promise<SupabaseClient> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();3
    
    if(serverClient) return serverClient; 

    serverClient = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const mutableStore = cookieStore as unknown as {
                set?: (name: string, value: string, options?: Record<string, unknown>) => void;
              };

              mutableStore.set?.(name, value, options);
            });
          } catch {
            // Ignore if called from a server component without mutable cookies.
          }
        },
      },
    });

    return serverClient;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
      },
    }) as SupabaseClient;
  }

  return browserClient;
}