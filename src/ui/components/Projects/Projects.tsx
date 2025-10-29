import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import Input from "../Input";
import Button from "../Button";
import List from "../List";
import { Link } from "react-router-dom";

const Projects = () => {
    const { projects, isLoading, createProject, deleteProject } = useProjects();
    const [newName, setNewName] = useState("");

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New Project Name"
            />
            <Button
                onClick={() => {
                    createProject.mutate(newName);
                    setNewName("");
                }}
            >
                Create
            </Button>

            <List>
                {projects?.map((project) => (
                    <List.Item key={project.id} className="justify-content-between">
                        <Link
                            to={`/dashboard/${project.id}`}
                        >
                            {project.name}
                        </Link>
                        <span
                            onClick={() => {
                                deleteProject.mutate(project.id);
                            }}
                        >
                            Delete
                        </span>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

export default Projects;
