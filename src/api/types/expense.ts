export type Expense = {
    id: number;
    title: string;
    amount: number;
    categoryId: string;
}

export type ExpenseClient = Omit<Expense, "id" | "categoryId">;
