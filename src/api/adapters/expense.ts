import { supabaseClient } from "../clients/supabaseClient";
import type { Expense } from "../types";

export const fetchExpensesByProjectId = async (
    projectId: string,
): Promise<Expense[]> => {
    try {
        const { data, error } = await supabaseClient
            .from("expenses")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: false }); // most recent go first

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw new Error(`Could not fetch expenses for project ${projectId}`);
    }
};

export const addExpenseToProject = async (expenses: Expense[]) => {
    try {
        const { data, error } = await supabaseClient
            .from("expenses")
            .insert(expenses)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding expense:", error);
        throw new Error("Could not add expense");
    }
};
