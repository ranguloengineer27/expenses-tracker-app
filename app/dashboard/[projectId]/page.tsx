"use client";

import { MainContainer } from "@/ui/components/MainContainer";
import { ProjectDashboard } from "@/ui/components/project/ProjectDashboard/ProjectDashboard";

export default function ProjectDashboardPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <MainContainer>
      <ProjectDashboard projectId={params.projectId} />
    </MainContainer>
  );
}

