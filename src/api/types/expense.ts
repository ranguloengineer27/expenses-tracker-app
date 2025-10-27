export type Expense = {
    id: string;
    title: string;
    amount: number;
    categoryId: string;
}

export type ExpenseClient = {
    id?: string;
    categoryId?: string;
    title: string;
    amount: number;
}