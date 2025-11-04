export type CategoryExpense = {
  id: string;
  project_id: string;
  name: string;
  parent_id?: string | null;
};

export type CategoryExpenseClient = Omit<CategoryExpense, "id">;
