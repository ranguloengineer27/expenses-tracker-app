import {  useState } from "react"
import { Button } from "../utility-components/Button"
import { useAddUserToProject } from "@/ui/hooks/project/useAddUserToProject";
import { useAuthStore } from "@/ui/stores/useAuthStore";
import { useProjectStore } from "@/ui/stores/useProjectStore";
import { UserSearchCombobox } from "../profile/ProfileSearch";
import { useDebounce } from "@/ui/hooks/shared/useDebounce";
import { fetchProfileByName } from "@/api/adapters/profile";
import { Profile } from "@/api/types/profile";
import { Role } from "@/api/types/role";
import { useProjectMembers } from "@/ui/hooks/projectMembers/useProjectMembers";
import { Table, TableBody, TableCell, TableRow } from "../utility-components";

const ERROR_USERNAME_NOT_EXISTS = "That username doesn't exist";

export const AddUsers = () => {
    const { mutate:addUser } = useAddUserToProject();
    const { user } = useAuthStore();
    const { currentProject } = useProjectStore();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const { data:projectMembersData } = useProjectMembers(currentProject?.id);
    const projectMembers = projectMembersData?.filter(({ role }) => role !== Role.owner)

    console.log("projectMembersData :::", projectMembersData)

    const fetchUser = useDebounce(async(name) => {
        const data = await fetchProfileByName(name, false)

        setProfiles(data ?? []);
    }, 2000);

    if(!currentProject|| !user || currentProject.owner_id !== user.id) return;

    return <div>
            <UserSearchCombobox profiles={profiles} onSearch={fetchUser}>
                {(profile) => (
                    <Button onClick={() => {
                        console.log('PROFILE :::', profile)
                        if(!profile) return;
                        
                        addUser({
                            newUserId: profile.id,
                            ownerId: user.id,
                            role: Role.member,
                            projectId: currentProject.id
                        })
                    }}>Add user</Button>
                )}
            </UserSearchCombobox>
            <Table>
                <TableBody>
                    <TableRow>
                        {projectMembers?.map((member) => <TableCell key={member.id}>{member.id}</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
    </div>
}