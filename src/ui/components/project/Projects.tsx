import { useProjects } from "../../hooks/useProjects";
import { ProjectsTable } from "./ProjectsTable/ProjectsTable";
import { ProjectInputName } from "./ProjectInputName";

const Projects = () => {
    const { projects, isLoading, createProject, deleteProject, updateProjectName } = useProjects();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <div className="w-3/5">
                <h1 className="mb-5">You can manage your projects here</h1>
                <ProjectInputName onCreate={(name) => createProject.mutate(name)} />

                <ProjectsTable
                    projects={projects}
                    onDelete={(projectId) => deleteProject.mutate(projectId)}
                    onUpdate={(args, options) => updateProjectName.mutate(args, options)}
                />
            </div>
        </div>
    );
};

export default Projects;
