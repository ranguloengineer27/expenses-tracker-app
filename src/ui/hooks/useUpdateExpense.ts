import { useMutation } from "@tanstack/react-query";
import type { Expense } from "../../api/types";
import { updateExpense } from "../../api/adapters";
import { queryClient } from "../../api/clients/queryClient";

type UpdateExpenseParams = {
    expenseId: string;
    updates: Partial<Expense>;
};

export const useUpdateExpense = () => {
    return useMutation<Expense, Error, UpdateExpenseParams>({
        mutationFn: ({ expenseId, updates }) => updateExpense(expenseId, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] })
    });
};
