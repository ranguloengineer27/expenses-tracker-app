import { Button } from "../../utility-components/Button";

type ProjectActionCellProps = {
    isEditing: boolean;
    onUpdate: () => void;
    setIsEditing: () => void;
    deleteProject: () => void;
};

export const ProjectActionCell = ({
    isEditing,
    onUpdate,
    setIsEditing,
    deleteProject
}: ProjectActionCellProps) => (
    <>
        {isEditing ? (
            <Button
                variant="link"
                onClick={onUpdate}
            >
                Save
            </Button>
        ) : (
            <><Button
                variant="link"
                onClick={deleteProject}
            >
                Delete
            </Button>
                <Button
                    variant="link"
                    onClick={setIsEditing}
                >
                    Edit
                </Button>
            </>

        )}
    </>
);


