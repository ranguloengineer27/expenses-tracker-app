import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "../../api/clients/supabaseClient";

type AuthState = {
    user: User | null;
    session: Session | null;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            session: null,

            setSession: (session) => set({
                session,
                user: session?.user ?? null,
            }),

            signIn: async (email) => {
                await supabaseClient.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: `${import.meta.env.VITE_APPLICATION_URL}/add-profile`,
                    },
                });
            },

            signOut: async () => {
                await supabaseClient.auth.signOut();
                set({ user: null, session: null });
            },
        }),
        { name: "auth-storage" }
    )
);
