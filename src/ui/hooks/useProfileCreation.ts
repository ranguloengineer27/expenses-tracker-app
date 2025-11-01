import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/clients/queryClient";
import { createProfile } from "../../api/adapters/profile";

export const useProfileCreation = () => {
  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data, variables) => {
      // update cache
      queryClient.setQueryData(["profile", variables.id], data[0]);
    },
  });
};
