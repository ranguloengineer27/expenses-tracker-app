import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "../../api/clients/supabaseClient";

type AuthState = {
    user: User | null;
    session: Session | null;
    signInWithPassword: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            session: null,

            setSession: (session) =>
                set({
                    session,
                    user: session?.user ?? null,
                }),
            signUp: async (email, password) => {
                const { data, error } = await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${import.meta.env.VITE_APPLICATION_URL}/add-profile`,
                    },
                });
                if (error) throw error;
                set({ user: data.user ?? null });
            },
            signInWithPassword: async (email, password) => {
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                if (error) throw error;
                set({ user: data.user ?? null });
            },

            signOut: async () => {
                await supabaseClient.auth.signOut();
                set({ user: null, session: null });
            },
        }),
        { name: "auth-storage" },
    ),
);
