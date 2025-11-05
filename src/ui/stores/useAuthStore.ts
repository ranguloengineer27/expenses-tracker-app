import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseClient } from "../../api/clients/supabaseClient";

type AuthState = {
    user: User | null;
    session: Session | null;
    signInWithPassword: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPasswordForEmail: (email: string) => Promise<void>;
    updatePassword: (newPassword: string) => Promise<void>;
    setSession: (session: Session | null) => void;
};

const initializer = (set: any): AuthState => ({
    user: null,
    session: null,

    setSession: (session: Session | null) =>
        set(
            {
                session,
                user: session?.user ?? null,
            },
            false,
            "auth/setSession",
        ),
    signUp: async (email: string, password: string) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${import.meta.env.VITE_APPLICATION_URL}/add-profile`,
            },
        });
        if (error) throw error;
        set({ user: data.user ?? null }, false, "auth/signUp");
    },
    signInWithPassword: async (email: string, password: string) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        set({ user: data.user ?? null }, false, "auth/signInWithPassword");
    },

    signOut: async () => {
        await supabaseClient.auth.signOut();
        set({ user: null, session: null }, false, "auth/signOut");
    },
    resetPasswordForEmail: async (email: string) => {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${import.meta.env.VITE_APPLICATION_URL}/reset-password`,
        });
        if (error) throw error;
    },
    updatePassword: async (newPassword: string) => {
        const { error } = await supabaseClient.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    },
});

export const useAuthStore = create<AuthState>()(
    (import.meta.env.DEV ? devtools : (fn: any) => fn)(
        persist(initializer, { name: "auth-storage" }),
        { name: "AuthStore" }
    ),
);
