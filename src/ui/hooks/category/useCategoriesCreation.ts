import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/clients/queryClient";
import { createCategories } from "../../../api/adapters";

export const useCreateCategories = (projectId: string) => {
  return useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", projectId] });
    },
  });
};
