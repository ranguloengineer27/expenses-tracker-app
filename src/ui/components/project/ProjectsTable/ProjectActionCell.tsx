import type { Project } from "../../../../api/types/project";
import { Button } from "../../utility-components/Button";

type ProjectActionCellProps = {
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

export const ProjectActionCell = ({
    isEditing,
    editingName,
    setIsEditing,
    setEditingName,
    onUpdate,
    project,
}: ProjectActionCellProps) => (
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


