import { useMutation } from "@tanstack/react-query";
import type { Expense } from "../../api/types";
import { updateExpense } from "../../api/adapters";
import { queryClient } from "../../api/clients/queryClient";

export const useUpdateExpense = () => {
  return useMutation({
    mutationFn: ({
      expenseId,
      updates,
    }: {
      expenseId: string;
      updates: Partial<Expense>;
    }) => updateExpense(expenseId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", "expenseLogs"] });
    },
  });
};
