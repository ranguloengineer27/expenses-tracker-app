export const LogActions = {
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
} as const;

export type ExpenseLog = {
    id: string;
    expense_id: string;
    created_at: string;
    action: keyof typeof LogActions;
    userId: string;
    profileName: string;
}