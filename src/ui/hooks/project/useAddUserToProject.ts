import { supabaseAddUserToProject } from "@/api/adapters";
import { queryClient } from "@/api/clients/queryClient";
import { InsertProjectMemberArgs } from "@/api/interfaces/addMembersToProject";
import { addMembersToProject } from "@/api/useCases/projectMembers/addMembersToProject";
import { useMutation } from "@tanstack/react-query";

const addUser = addMembersToProject(supabaseAddUserToProject);

export function useAddUserToProject() {
  return useMutation({
    mutationFn: ({
      projectId,
      ownerId,
      newUserId,
      role,
    }: InsertProjectMemberArgs) =>
      addUser({
        projectId,
        ownerId,
        newUserId,
        role,
      }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project_members", variables.projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
