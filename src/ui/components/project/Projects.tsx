import { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { Input } from "../utility-components/input";
import { Link } from "react-router-dom";
import { Button } from "../utility-components/button";
import { Table, TableCell, TableRow } from "../utility-components/table";

const Projects = () => {
    const { projects, isLoading, createProject, deleteProject } = useProjects();
    const [newName, setNewName] = useState("");

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <div className="w-3/5">
                <h1 className="mb-5">You can manage your projects here</h1>
                <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New Project Name"
                />
                <Button
                    className="mt-2"
                    onClick={() => {
                        createProject.mutate(newName);
                        setNewName("");
                    }}
                >
                    Create
                </Button>

                <Table className="mt-6">
                    {projects?.map((project) => (
                        <TableRow key={project.id} className="justify-content-between">
                            <TableCell>
                                <Link to={`/dashboard/${project.id}`}>{project.name}</Link>
                            </TableCell>
                            <TableCell>
                                <span
                                    onClick={() => {
                                        deleteProject.mutate(project.id);
                                    }}
                                >
                                    Delete
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default Projects;
