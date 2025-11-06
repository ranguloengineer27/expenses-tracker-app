export type ServerInvoice = {
  line_items: Array<{
    id: string;
    full_description: string;
    total: number;
    type: string;
    quantity: number;
  }>;
  vendor: {
    name: string;
    category: string;
  };
  payment: {
    type: string;
  }
  currency_code: string;
};

export type ClientInvoiceProduct = {
  name: string;
  price: number;
  categoryName?: string;
  vendorName?: string;
  vendorCategoryName?: string;
};
