export type Expense = {
  id: string;
  project_id: string;
  description: string;
  amount: number;
  category_id?: string | null;
  user_id: string;
  quantity?: number;
  payment_type?: string;
};
