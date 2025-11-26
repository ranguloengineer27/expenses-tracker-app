"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../../../api/adapters/project";
import { withLoader } from "../../../HOC/withLoader";
import { useEffect, type FC } from "react";
import ExpensesAdding from "../../expense/ExpensesAdding/ExpensesAdding";
import { useProjectStore } from "../../../stores/useProjectStore";
import ExpenseList from "../../expense/ExpenseList/ExpenseList";
/* import { ExpenseLogsList } from "../../log/Logs"; */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../utility-components/Tabs";
import { setExpensesSizing } from "../../expense/expenseHelpers";
import { useAuthStore } from "@/ui/stores/useAuthStore";
import { canUserAddMembers } from "@/api/services/canUserAddMembers";
import { AddUsers } from "../../auth/AddUsers";

type ProjectTitleComponentProps = {
    name: string;
};

const ProjectTitle: FC<ProjectTitleComponentProps> = ({ name }) => (
    <h2 className="text-4xl mt-4 mb-4">{name}</h2>
);

const ProjectTitleComponent = withLoader(ProjectTitle);

export const ProjectDashboard = ({ projectId }: { projectId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });
    const { user } = useAuthStore();
    const setCurrentProject = useProjectStore((s) => s.setCurrentProject);
    const shouldShowAddingUsersTab = canUserAddMembers(user?.id ?? "", data?.owner_id)

    //const canUserAddMembers = isUserProjectOwner({ userId: user?.id ?? "", projectId: data.owner_id })



    useEffect(() => {
        console.log('DATA :::', data)
        setCurrentProject(data);
    }, [data]);

    const { expensePageWrapperHeight } = setExpensesSizing();

    return (
        <div>
            <ProjectTitleComponent isLoading={isLoading} name={data?.name} />
            <hr />
            <Tabs defaultValue="addExpense" className="flex flex-col h-full w-full">
                <TabsList className="flex justify-evenly mt-2">
                    <TabsTrigger value="addExpense" className="cursor-pointer">
                        Add expenses
                    </TabsTrigger>
                    <TabsTrigger value="expensesList" className="cursor-pointer">
                        Record expenses
                    </TabsTrigger>

                    {/* {shouldShowAddingUsersTab && ( TODO: FIX BE ISSUES
                        <TabsTrigger value="addUsers" className="cursor-pointer">
                            Add users
                        </TabsTrigger>
                    )} */}

                    
                </TabsList>
                <TabsContent value="addExpense">
                    <div
                        style={{ minHeight: expensePageWrapperHeight }}
                    >
                        <ExpensesAdding />
                    </div>
                </TabsContent>
                <TabsContent value="expensesList">
                    <div style={{ minHeight: expensePageWrapperHeight }}>
                        <ExpenseList />
                    </div>
                </TabsContent>

                {shouldShowAddingUsersTab && <TabsContent value="addUsers">
                    <div style={{ minHeight: expensePageWrapperHeight }}>
                        <AddUsers />
                    </div>
                </TabsContent>}
            </Tabs>
        </div>
    );
};
