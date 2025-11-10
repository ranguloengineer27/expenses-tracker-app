import type { Project } from "../../../../api/types/project";
import { Table, TableBody } from "../../utility-components";
import { ProjectRow } from "./ProjectRow";

type ProjectsTableProps = {
    projects?: Project[];
};

export const ProjectsTable = ({ projects }: ProjectsTableProps) => {
    return (
        <Table className="mt-6">
            <TableBody>
            {projects?.map((project) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                />
            ))}
            </TableBody>
        </Table>
    );
};


