import type { Expense, ServerInvoice } from "../types";

export const extractInvoiceData = async (
  file: File,
  userId: string,
  projectId: string,
  token: string,
): Promise<Array<Omit<Expense, "id">>> => {
  const formData = new FormData();
  formData.append("file", file);

  // Get Supabase URL and anon key for the edge function
  /* const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_2;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing Supabase URL configuration");
  } */
  
  const headers: HeadersInit = {
    // Don't set Content-Type for FormData - browser will set it with boundary
  };
  headers.Authorization = `Bearer ${token}`;

  const resp = await fetch(
    `${import.meta.env.VITE_INVOICE_SERVICE_URL}/functions/v1/invoiceReading`,
    {
      method: "POST",
      headers,
      body: formData,
    },
  );

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`Invoice extraction failed: ${resp.status} - ${errorText}`);
  }

  const data: ServerInvoice = await resp.json();

  const products: Array<Omit<Expense, "id">> = data.line_items.map(
    (product) => ({
      description: product.full_description,
      amount: product.total,
      user_id: userId,
      project_id: projectId,
      quantity: product.quantity,
      payment_type: data.payment.type,
      currency: data.currency_code,
    }),
  );
  return products;
};
