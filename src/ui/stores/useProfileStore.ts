import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Profile } from "../../api/types/profile";

type ProfileState = {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
};

const initializer = (set: any): ProfileState => ({
    profile: null,
    setProfile: (profile: Profile | null) => set({ profile }, false, "profile/setProfile"),
});

export const useProfileStore = create<ProfileState>()(
    (import.meta.env.DEV ? devtools : (fn: any) => fn)(
        persist(initializer, { name: "profile-storage" }),
        { name: "ProfileStore" }
    ),
);
