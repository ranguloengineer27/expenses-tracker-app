import { fetchProjectMembersByProjectId } from "@/api/adapters";
import { useQuery } from "@tanstack/react-query";

export const useProjectMembers = (projectId?: string) => {
  return useQuery({
    queryKey: ["project-members", projectId],
    queryFn: () => fetchProjectMembersByProjectId(projectId!),
    enabled: !!projectId, // evita ejecutar si no hay ID
    staleTime: 1000 * 60, // 1 min
  });
};
