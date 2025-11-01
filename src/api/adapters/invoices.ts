import type { Expense, ServerInvoice } from "../types";

export const extractInvoiceData = async (
  file: File,
  userId: string,
  projectId: string,
): Promise<Array<Omit<Expense, "id">>> => {
  const formData = new FormData();
  formData.append("file", file);

  const resp = await fetch("http://localhost:3009/api/readReceipt", {
    method: "POST",
    body: formData,
  });

  if (!resp.ok) {
    throw new Error(`Invoice extraction failed: ${resp.status}`);
  }

  const data: ServerInvoice = await resp.json();

  const products: Array<Omit<Expense, "id">> = data.line_items.map(
    (product) => ({
      description: product.full_description,
      amount: product.total,
      user_id: userId,
      project_id: projectId,
    }),
  );
  return products;
};
