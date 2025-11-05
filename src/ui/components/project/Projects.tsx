import { useProjects } from "../../hooks/useProjects";
import { ProjectsTable } from "./ProjectsTable/ProjectsTable";
import { ProjectInputName } from "./ProjectInputName";

const Projects = () => {
    const { projects, isLoading, createProject } = useProjects();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="mt-5">
            <div className="w-3/5">
                <h1 className="mb-5">You can manage your projects here</h1>
                <ProjectInputName onCreate={(name) => createProject.mutate(name)} />

                <ProjectsTable
                    projects={projects}
                />
            </div>
        </div>
    );
};

export default Projects;
