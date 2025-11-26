import { addMembersToProjectInterface, InsertProjectMemberArgs } from "@/api/interfaces/addMembersToProject";
import { canUserAddMembers } from "@/api/services/canUserAddMembers";

export const addMembersToProject =
  (deps: addMembersToProjectInterface) =>
  async ({ newUserId, projectId, ownerId, role }: InsertProjectMemberArgs) => {
    await deps.insertProjectMember({ newUserId, projectId, ownerId, role });
    return { ok: true };
  };
