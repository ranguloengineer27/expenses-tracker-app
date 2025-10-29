import { create } from "zustand";
import type { Project } from "../../api/types/project";
import { persist } from "zustand/middleware";

type ProjectState = {
    currentProject: Project | null;
    setCurrentProject: (project: Project | null) => void;
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            currentProject: null,
            setCurrentProject: (project) => set({ currentProject: project }),
        }),
        {
            name: 'project-storage',
        }
    )
)