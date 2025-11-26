export const canUserAddMembers = (userId:string, ownerId:string): boolean => {
    return userId === ownerId;
};
  