import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../../api/adapters/project";
import { withLoader } from "../../../HOC/withLoader";
import { useEffect, type FC } from "react";
import ExpensesAdding from "../../expense/ExpensesAdding/ExpensesAdding";
import { useProjectStore } from "../../../stores/useProjectStore";
import ExpenseList from "../../expense/ExpenseList/ExpenseList";
/* import { ExpenseLogsList } from "../../log/Logs"; */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../utility-components/Tabs";
import { setExpensesSizing } from "../../expense/expenseHelpers";

type ProjectTitleComponentProps = {
    name: string;
};
const ProjectTitle: FC<ProjectTitleComponentProps> = ({ name }) => (
    <h2 className="text-4xl mt-4 mb-4">{name}</h2>
);

const ProjectTitleComponent = withLoader(ProjectTitle);

export const ProjectDashboard = () => {
    const { projectId } = useParams();
    const { data } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });

    const setCurrentProject = useProjectStore((s) => s.setCurrentProject);

    useEffect(() => {
        setCurrentProject(data);
    }, [data]);

    const { data: project, isLoading } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });

    const { expensePageWrapperHeight } = setExpensesSizing();

    return (
        <div>
            <ProjectTitleComponent isLoading={isLoading} name={project?.name} />
            <hr />
            <Tabs defaultValue="addExpense" className="flex flex-col h-full w-full">
                <TabsList className="flex justify-evenly mt-2">
                    <TabsTrigger value="addExpense" className="cursor-pointer">
                        Add expenses
                    </TabsTrigger>
                    <TabsTrigger value="expensesList" className="cursor-pointer">
                        Record expenses
                    </TabsTrigger>
                    {/* <TabsTrigger value="logsList" className="cursor-pointer">
                        <Button variant={"secondary"}>Logs expenses</Button>
                    </TabsTrigger> */}
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
                {/* <TabsContent value="logsList">
          <ExpenseLogsList /> TODO: Fix state update and replace List by Table
        </TabsContent> */}
            </Tabs>
        </div>
    );
};
