import { createClient as createSupabaseClient } from "../../../app/supabaseClient";
import { addMembersToProjectInterface, InsertProjectMemberArgs } from "../interfaces/addMembersToProject";
import { Profile } from "../types/profile";
import { ProjectMember } from "../types/projectMember";
import { Role, RoleType } from "../types/role";

export const fetchProjectMembersByUserId = async (userId: string) => {
  try {
    if (!userId) throw new Error("userId is required");

    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("project_members")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Error fetching project members: ${error}`);
  }
};

export const supabaseAddUserToProject:addMembersToProjectInterface = {
  insertProjectMember: async ({
    newUserId,
    ownerId,
    role,
    projectId
  }:InsertProjectMemberArgs) => {
      try {
        if (!projectId || !ownerId || !newUserId) {
          throw new Error("Missing required parameters");
        }

        const supabase = await createSupabaseClient();

        // 1️⃣ Verify the user calling this function is the project owner
        /* const { data: ownerCheck, error: ownerCheckError } = await supabase
          .from("project_members")
          .select("role")
          .eq("project_id", projectId)
          .eq("user_id", ownerId)
          .single(); */

        /* if (ownerCheckError) throw ownerCheckError;

        if (!ownerCheck || ownerCheck.role !== Role.owner) {
          throw new Error("Only project owners can add members");
        } */

        // 2️⃣ Add the new user to the project
        const { data, error } = await supabase
          .from("project_members")
          .insert({
            project_id: projectId,
            user_id: newUserId,
            role,
          })
          .select()
          .single();

        if (error) throw error;

        return data;

      } catch (error: any) {
        throw new Error(`Error adding user to project: ${error.message}`);
      }
    }
};

export const fetchProjectMembersByProjectId = async (
  projectId: string
): Promise<ProjectMember[]> => {
  try {
    if (!projectId) {
      throw new Error("projectId is required");
    }

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("project_members")
      .select("*")
      .eq("project_id", projectId);

    if (error) throw error;

    return data ?? [];
  } catch (error: any) {
    throw new Error(`Error fetching project members: ${error.message}`);
  }
};