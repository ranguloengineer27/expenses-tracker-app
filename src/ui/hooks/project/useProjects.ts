import { useQuery, useMutation } from "@tanstack/react-query";
import { createClient as createSupabaseClient } from "../../../../app/supabaseClient";
import type { Project } from "../../../api/types/project";
import { fetchProjects } from "../../../api/adapters/project";
import { queryClient } from "../../../api/clients/queryClient";
import { useAuthStore } from "../../stores/useAuthStore";

export const useProjects = () => {
  const { user } = useAuthStore();

  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(user?.id ?? ""),
  });

  const createProject = useMutation({
    mutationFn: async (name: string) => {
      const userId = user?.id;

      const supabase = await createSupabaseClient();
      const { data, error } = await supabase.from("projects").insert({
        name,
        owner_id: userId,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
  /* const fetchProjectById = async (projectId: string) => {
        const supabase = await createSupabaseClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single()

        if (error) throw error
        return data
    }

    const getProjectDataById = (projectId: string) => {
        const { data, error } = useQuery({
            queryKey: ['project', projectId],
            queryFn: () => getProjectById(projectId!),
            enabled: !!projectId,
        });

        if (error) throw error
        return data
    } */

  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      const supabase = await createSupabaseClient();
      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const updateProjectName = useMutation({
    mutationFn: async ({ projectId, name }: { projectId: string; name: string }) => {
      const supabase = await createSupabaseClient();
      const { data, error } = await supabase
        .from("projects")
        .update({ name })
        .eq("id", projectId);

      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return { projects, isLoading, error, createProject, deleteProject, updateProjectName };
};
