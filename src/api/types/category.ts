export type ExpenseCategory = {
  id: string;
  project_id: string;
  name: string;
};

export type ExpenseClientCategory = Omit<ExpenseCategory, "id">;
