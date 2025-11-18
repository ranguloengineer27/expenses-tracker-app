import { createClient as createSupabaseClient } from "../../../app/supabaseClient";
import type { Profile } from "../types/profile";

export const fechProfileById = async (id: string) => {
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(error);
      return error;
    }

    return data;
  } catch (e) {
    throw new Error(`Error fetching profile data: ${e}`);
  }
};

export const createProfile = async (profile: any): Promise<Profile[]> => {
  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("profiles")
      .insert(profile)
      .select();

    if (error) throw error;
    return data;
  } catch (e) {
    throw new Error(`Error creating profile: ${e}`);
  }
};
