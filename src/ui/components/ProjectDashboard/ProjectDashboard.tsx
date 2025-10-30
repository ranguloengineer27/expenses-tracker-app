import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../api/adapters/project";
import { withLoader } from "../../HOC/withLoader";
import { useEffect, type FC } from "react";
import ExpensesAdding from "../expense/ExpensesAdding/ExpensesAdding";
import { useProjectStore } from "../../stores/useProjectStore";

type ProjectTitleComponentProps = {
    name: string;
};
const ProjectTitle: FC<ProjectTitleComponentProps> = ({ name }) => (
    <h2 className="text-center">{name}</h2>
);

const ProjectTitleComponent = withLoader(ProjectTitle);

export const ProjectDashboard = () => {
    const { projectId } = useParams();
    const { data } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });

    const setCurrentProject = useProjectStore((s) => s.setCurrentProject);

    useEffect(() => {
        setCurrentProject(data)
    }, [data])

    const { data: project, isLoading } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });


    return (
        <div>
            <ProjectTitleComponent isLoading={isLoading} name={project?.name} />
            <ExpensesAdding />
        </div>
    );
};
