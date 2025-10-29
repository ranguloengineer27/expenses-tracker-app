import { supabaseClient } from "../clients/supabaseClient";

export const fetchProjectMembersByUserId = async (userId: string) => {
    try {
        if (!userId) throw new Error("userId is required");

        const { data, error } = await supabaseClient
            .from('project_members')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    } catch (error) {
        throw new Error(`Error fetching project members: ${error}`);
    }
}


