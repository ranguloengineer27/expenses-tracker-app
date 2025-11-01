export type ExpenseCategory = {
  id: string;
  project_id: string;
  name: string;
  parent_id?: string | null;
};

export type ExpenseClientCategory = Omit<ExpenseCategory, "id">;
