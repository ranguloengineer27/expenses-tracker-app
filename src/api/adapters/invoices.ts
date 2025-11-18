import type { Expense, ServerInvoice } from "../types";

export const extractInvoiceData = async (
  file: File,
  userId: string,
  projectId: string,
  token: string,
): Promise<Array<Omit<Expense, "id">>> => {
  const formData = new FormData();
  formData.append("file", file);

  const headers: HeadersInit = {
  };
  headers.Authorization = `Bearer ${token}`;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_INVOICE_SERVICE_URL}/functions/v1/invoiceReading`,
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
    }),
  );
  return products;
};
