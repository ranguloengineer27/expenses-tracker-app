import { createClient as createSupabaseClient } from "../../../app/supabaseClient";
import type { Profile } from "../types/profile";

export const fetchProfileByName = async (
  name: string,
  exactMatch: boolean = true,
  limit: number = 5
): Promise<Profile[]> => {
  try {
    if (!name) throw new Error("name is required");

    const supabase = await createSupabaseClient();

    let query = supabase
      .from("profiles")
      .select("*");

    if (exactMatch) {
      query = query.eq("name", name);
    } else {
      query = query.ilike("name", `%${name}%`);
    }

    const { data, error } = await query.limit(limit);

    if (error) throw error;

    return data ?? [];

  } catch (error: any) {
    throw new Error(`Error fetching profile by name: ${error.message}`);
  }
};


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

export const fetchAllProfiles = async () => {
  try {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (error) throw error;

    return data;
  } catch (error: any) {
    throw new Error(`Error fetching profiles: ${error.message}`);
  }
};
