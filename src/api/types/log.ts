export const logActions = {
  create: "create",
  update: "update",
  delete: "delete",
} as const;

export type LogActionsType = keyof typeof logActions;

export type ExpenseLog = {
  id: string;
  expense_id: string;
  created_at: string;
  action: LogActionsType;
  user_id: string;
  profileName: string;
  payload: any;
};
