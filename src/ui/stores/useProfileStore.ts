import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../../api/types/profile";
import { withDevtools } from "./utils/withDevtools";

type ProfileState = {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
};

const initializer = (set: any): ProfileState => ({
    profile: null,
    setProfile: (profile: Profile | null) => set({ profile }, false, "profile/setProfile"),
});

export const useProfileStore = create<ProfileState>()(
    withDevtools(
        persist(initializer, { name: "profile-storage" }),
        { name: "ProfileStore" }
    ),
);
