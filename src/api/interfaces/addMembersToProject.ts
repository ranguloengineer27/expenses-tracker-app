import { RoleType } from "../types/role";

export type InsertProjectMemberArgs = {
    projectId: string,
    ownerId: string,
    newUserId: string,
    role: Omit<RoleType, "owner">
}

export interface addMembersToProjectInterface<T = {}>{
    insertProjectMember:(args: InsertProjectMemberArgs) => Promise<void>
}
