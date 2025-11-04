import { useState } from "react";
import { TableCell, TableRow } from "../../utility-components";
import { ProjectNameCell } from "./ProjectNameCell";
import { ProjectActionCell } from "./ProjectActionCell";
import type { Project } from "../../../../api/types/project";
import { useProjects } from "../../../hooks/useProjects";

type ProjectRowProps = {
    project: Project;
};

export const ProjectRow = ({ project }: ProjectRowProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<string>(project?.name ?? "");
    const { deleteProject, updateProjectName } = useProjects()

    return (
        <TableRow key={project.id} className="justify-content-between">
            <TableCell>
                <ProjectNameCell
                    isEditing={isEditing}
                    editingName={editingName}
                    onChangeEditingName={setEditingName}
                    projectId={project.id}
                    projectName={project.name}
                />
            </TableCell>
            <TableCell>
                <ProjectActionCell
                    deleteProject={() => {
                        deleteProject.mutate(project.id);
                    }}
                    isEditing={isEditing}
                    setIsEditing={() => setIsEditing(true)}
                    onUpdate={() => {
                        updateProjectName.mutate({ projectId: project.id, name: editingName });
                        setIsEditing(false);
                        setEditingName('')
                    }}
                />
            </TableCell>
        </TableRow>
    );
};


