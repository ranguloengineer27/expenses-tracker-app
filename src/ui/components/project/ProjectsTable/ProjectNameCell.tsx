import { Link } from "react-router-dom";
import { Input } from "../../utility-components/Input";

type ProjectNameCellProps = {
    isEditing: boolean;
    editingName: string;
    onChangeEditingName: (value: string) => void;
    projectId: string;
    projectName: string;
};

export const ProjectNameCell = ({
    isEditing,
    editingName,
    onChangeEditingName,
    projectId,
    projectName,
}: ProjectNameCellProps) => (
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


