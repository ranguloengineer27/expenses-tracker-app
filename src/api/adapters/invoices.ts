import type { ExpenseClient, ServerInvoice } from "../types";

export const extractInvoiceData = async (
    file: File,
): Promise<ExpenseClient[]> => {
    const formData = new FormData()
    formData.append("file", file);

    const resp = await fetch("http://localhost:3009/api/readReceipt", {
        method: "POST",
        body: formData
    })

    if (!resp.ok) {
        throw new Error(`Invoice extraction failed: ${resp.status}`)
    }

    const data: ServerInvoice = await resp.json();

    const products: ExpenseClient[] = data.line_items.map((product) => ({
        title: product.full_description,
        amount: product.total,
    }));

    return products
}
