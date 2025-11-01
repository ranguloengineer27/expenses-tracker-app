import { supabaseClient } from "../clients/supabaseClient";
import type { Profile } from "../types/profile";

export const fechProfileById = async (id: string) => {
  try {
    const { data, error } = await supabaseClient
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
    const { data, error } = await supabaseClient
      .from("profiles")
      .insert(profile)
      .select();

    if (error) throw error;
    return data;
  } catch (e) {
    throw new Error(`Error creating profile: ${e}`);
  }
};
