import { supabaseClient } from "../clients/supabaseClient";
import { fetchProjectMembersByUserId } from "./projectMembers";

export const fetchProjects = async (userId: string) => {
    try {
        if (!userId) throw new Error("Not authenticated");

        const projectMembers = await fetchProjectMembersByUserId(userId);

        const projectIds = projectMembers.map(({ project_id }) => project_id);

        const { data, error } = await supabaseClient
            .from("projects")
            .select("*")
            .in("id", projectIds);

        if (error) throw error;
        return data;
    } catch (error) {
        throw new Error(`Error fetching projects: ${error}`);
    }
};

export const getProjectById = async (projectId: string) => {
    try {
        const { data, error } = await supabaseClient
            .from("projects")
            .select("*")
            .eq("id", projectId)
            .single();

        if (error) throw error;
        if (!data) throw new Error("Project not found or access denied");
        return data;
    } catch (error) {
        throw new Error(`Error fetching project with id ${projectId}: ${error}`);
    }
};
