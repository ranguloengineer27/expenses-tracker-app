import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../utility-components/Input";
import { Button } from "../utility-components/Button";
import { TableCell, TableRow } from "../utility-components/Table";
import type { Project } from "../../../api/types/project";

type ProjectNameProps = {
    isEditing: boolean;
    editingName: string;
    onChangeEditingName: (value: string) => void;
    projectId: string;
    projectName: string;
};


type ProjectActionProps = {
    isEditing: boolean;
    editingName: string;
    setIsEditing: (value: boolean) => void;
    setEditingName: (value: string) => void;
    onUpdate: (
        args: { projectId: string; name: string },
        options?: { onSuccess?: () => void }
    ) => void;
    project: Project;
};

const ProjectName = ({ isEditing, editingName, onChangeEditingName, projectId, projectName }: ProjectNameProps) => (
    <>
        {isEditing ? (
            <Input
                value={editingName}
                onChange={(e) => onChangeEditingName(e.target.value)}
                placeholder="Project Name"
            />
        ) : (
            <Link to={`/dashboard/${projectId}`}>{projectName}</Link>
        )}
    </>
);

const ProjectAction = ({
    isEditing,
    editingName,
    setIsEditing,
    setEditingName,
    onUpdate,
    project,
}: ProjectActionProps) => (
    <>
        {isEditing ? (
            <Button
                variant="link"
                onClick={() => {
                    onUpdate(
                        { projectId: project.id, name: editingName },
                        {
                            onSuccess: () => {
                                setIsEditing(false);
                                setEditingName("");
                            },
                        }
                    );
                }}
            >
                Save
            </Button>
        ) : (
            <Button
                variant="link"
                onClick={() => {
                    setIsEditing(true);
                    setEditingName(project.name);
                }}
            >
                Edit
            </Button>
        )}
    </>
);

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
                <ProjectName
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
                <ProjectAction
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


