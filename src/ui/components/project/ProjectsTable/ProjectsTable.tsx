import type { Project } from "../../../../api/types/project";
import { Table } from "../../utility-components";
import { ProjectRow } from "./ProjectRow";

type ProjectsTableProps = {
    projects?: Project[];
};

export const ProjectsTable = ({ projects }: ProjectsTableProps) => {
    return (
        <Table className="mt-6">
            {projects?.map((project) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                />
            ))}
        </Table>
    );
};


