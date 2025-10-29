import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../api/adapters/project";

export const ProjectDashboard = () => {
    const { projectId } = useParams();

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => projectId && getProjectById(projectId)
    });

    console.log('PROJECT ::', project)
    return <h2 className="text-center">{project.name}</h2>
}