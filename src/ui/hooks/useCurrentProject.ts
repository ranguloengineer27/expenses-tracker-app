import { useProjectStore } from "../stores/useProjectStore";

export const useCurrentProject = () => {
  const project = useProjectStore((state) => state.currentProject);
  return project;
};
