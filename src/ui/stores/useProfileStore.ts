import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../../api/types/profile";

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profile) => set({ profile }),
    }),
    { name: "profile-storage" },
  ),
);
