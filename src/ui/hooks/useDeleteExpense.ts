import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpenses } from "../../api/adapters";

export const useDeleteExpenses = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (expenseIds: string[]) => deleteExpenses(expenseIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
        onError: (error) => {
            console.error("Error deleting expenses:", error);
        },
    });
};
