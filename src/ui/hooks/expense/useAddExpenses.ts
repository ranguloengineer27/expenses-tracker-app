import { useMutation } from "@tanstack/react-query";
import { addExpenseToProject } from "../../../api/adapters";
import { queryClient } from "../../../api/clients/queryClient";

export const useAddExpenses = () => {
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
