// export type Role = "owner" | "member" | "viewer";
export const Role = {
    owner: "owner",
    member: "member",
    viewer: "viewer",
} as const;

export type RoleType = keyof typeof Role;