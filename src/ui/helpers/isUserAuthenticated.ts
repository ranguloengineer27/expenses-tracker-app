import type { User } from "@supabase/supabase-js";

export const isUserAuthenticated = (userData: User | null): boolean => {
    if (!userData) return false;

    return userData?.user_metadata?.email_verified;
}