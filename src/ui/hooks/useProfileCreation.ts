import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "../../api/clients/supabaseClient";
import { queryClient } from "../../api/clients/queryClient";

export const useProfileCreation = () => {
    return useMutation({
        mutationFn: async (profile: any) => {
            const { data, error } = await supabaseClient
                .from('profiles')
                .insert(profile)
                .select();

            if (error) throw error;
            return data;
        },
        onSuccess: (data, variables) => {
            // update cache
            queryClient.setQueryData(['profile', variables.id], data[0]);
        },
    });
}