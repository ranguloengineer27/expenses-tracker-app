import { supabaseClient } from "../clients/supabaseClient";
import type { CategoryExpenseClient } from "../types";

export const createCategories = async (categories: CategoryExpenseClient[]) => {
  const { data, error } = await supabaseClient
    .from("project_categories")
    .insert(categories)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const fetchCategories = async (projectId: string) => {
  const { data, error } = await supabaseClient
    .from("project_categories")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
