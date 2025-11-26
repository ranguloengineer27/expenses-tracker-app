import { useProjects } from "../../hooks/project/useProjects";
import { ProjectsTable } from "./ProjectsTable/ProjectsTable";
import { ProjectInputName } from "./ProjectInputName";
import { Spinner } from "../utility-components/Spinner";

const Projects = () => {
    const { projects, isLoading } = useProjects();

    if (isLoading) return <Spinner />;

    return (
        <>
            <ProjectsTable
                projects={projects}
            />
        </>
    );
};

export default Projects;
