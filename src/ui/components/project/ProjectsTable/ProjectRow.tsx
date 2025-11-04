import { useState } from "react";
import { Button } from "../../utility-components/Button";
import { TableCell, TableRow } from "../../utility-components";
import { ProjectNameCell } from "./ProjectNameCell";
import { ProjectActionCell } from "./ProjectActionCell";
import type { Project } from "../../../../api/types/project";

type ProjectRowProps = {
    project: Project;
    onDelete: (projectId: string) => void;
    onUpdate: (
        args: { projectId: string; name: string },
        options?: { onSuccess?: () => void }
    ) => void;
};

export const ProjectRow = ({ project, onDelete, onUpdate }: ProjectRowProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<string>("");

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
                <Button
                    variant="link"
                    onClick={() => {
                        onDelete(project.id);
                    }}
                >
                    Delete
                </Button>
                <ProjectActionCell
                    isEditing={isEditing}
                    editingName={editingName}
                    setIsEditing={setIsEditing}
                    setEditingName={setEditingName}
                    onUpdate={onUpdate}
                    project={project}
                />
            </TableCell>
        </TableRow>
    );
};


