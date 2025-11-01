import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpenseToProject } from "../../api/adapters";

export const useAddExpenses = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addExpenseToProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
        onError: (error) => {
            console.error("Error creating expenses:", error);
        },
    });
};
