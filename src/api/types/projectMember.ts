import { Profile } from "./profile";
import { RoleType } from "./role";

export type ProjectMember = Profile & { role: RoleType };