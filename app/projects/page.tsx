"use client";

import Projects from "../../src/ui/components/project/Projects";
import { MainContainer } from "../../src/ui/components/MainContainer";
import { ProjectInputName } from "@/ui/components/project/ProjectInputName";
import { useProjects } from "@/ui/hooks/project/useProjects";

export default function ProjectsPage() {
    const { createProject } = useProjects();

  return (
    <MainContainer>
        <div className="mt-5">
            <div className="w-3/5">
                <h1 className="mb-5">You can manage your projects here</h1>
                <ProjectInputName onCreate={(name) => createProject.mutate(name)} />
            </div>
        </div>
        <div className="w-3/5">
          <Projects />
        </div>
    </MainContainer>
  );
}

