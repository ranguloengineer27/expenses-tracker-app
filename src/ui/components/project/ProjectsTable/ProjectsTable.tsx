import type { Project } from "../../../../api/types/project";
import { Table } from "../../utility-components";
import { ProjectRow } from "./ProjectRow";

type ProjectsTableProps = {
    projects?: Project[];
    onDelete: (projectId: string) => void;
    onUpdate: (
        args: { projectId: string; name: string },
        options?: { onSuccess?: () => void }
    ) => void;
};

export const ProjectsTable = ({ projects, onDelete, onUpdate }: ProjectsTableProps) => {
    return (
        <Table className="mt-6">
            {projects?.map((project) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </Table>
    );
};


