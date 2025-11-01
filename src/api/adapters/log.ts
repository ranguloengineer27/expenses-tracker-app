import { supabaseClient } from "../clients/supabaseClient";
import type { ExpenseLog } from "../types/log";

export const getExpenseLogs = async (userId: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("expense_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ExpenseLog[];
  } catch (error) {
    console.error("Error fetching expense logs:", error);
    throw new Error("Could not fetch expense logs");
  }
};
