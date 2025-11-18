import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "@supabase/supabase-js";
import { createClient as createSupabaseClient } from "../../../app/supabaseClient";
import { withDevtools } from "./utils/withDevtools";

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
        const supabase = await createSupabaseClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/add-profile`,
            },
        });
        if (error) throw error;
        set({ user: data.user ?? null }, false, "auth/signUp");
    },
    signInWithPassword: async (email: string, password: string) => {
        const supabase = await createSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        set({ user: data.user ?? null }, false, "auth/signInWithPassword");
    },

    signOut: async () => {
        const supabase = await createSupabaseClient();
        await supabase.auth.signOut();
        set({ user: null, session: null }, false, "auth/signOut");
    },
    resetPasswordForEmail: async (email: string) => {
        const supabase = await createSupabaseClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/reset-password`,
        });
        if (error) throw error;
    },
    updatePassword: async (newPassword: string) => {
        const supabase = await createSupabaseClient();
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    },
});

export const useAuthStore = create<AuthState>()(
    withDevtools(
        persist(initializer, { name: "auth-storage" }),
        { name: "AuthStore" }
    ),
);
