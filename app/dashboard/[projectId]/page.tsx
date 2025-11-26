"use client";

import { MainContainer } from "@/ui/components/MainContainer";
import { ProjectDashboard } from "@/ui/components/project/ProjectDashboard/ProjectDashboard";
import { use } from "react";

export default function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
const parameters = use(params);

  return (
    <MainContainer>
      <ProjectDashboard projectId={parameters?.projectId} />
    </MainContainer>
  );
}

