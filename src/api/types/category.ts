export type ExpenseCategory = {
    id: string;
    name: string;
}

export type ExpenseClientCategory = Omit<ExpenseCategory, "id">;
