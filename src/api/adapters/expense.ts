import { supabaseClient } from "../clients/supabaseClient";
import type { Expense } from "../types";

export const fetchExpensesByProjectId = async (
    projectId: string,
    page: number,
    limit: number,
): Promise<{ data: Expense[]; total: number }> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    try {
        const { data, error, count } = await supabaseClient
            .from("expenses")
            .select("*", { count: "exact" })
            .eq("project_id", projectId)
            .order("created_at", { ascending: false }) // most recent go first
            .range(from, to);

        if (error) throw error;

        return { data, total: count ?? 0 };
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw new Error(`Could not fetch expenses for project ${projectId}`);
    }
};

export const addExpenseToProject = async (
    expenses: Array<Omit<Expense, "id">>,
) => {
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

export const updateExpense = async (
    expenseId: string,
    updates: Partial<Expense>,
) => {
    try {
        const { data, error } = await supabaseClient
            .from("expenses")
            .update(updates)
            .eq("id", expenseId)
            .select();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error updating expense:", error);
        throw new Error("Could not update expense");
    }
};

export const deleteExpenses = async (expenseIds: string[]) => {
    try {
        const { error } = await supabaseClient
            .from("expenses")
            .delete()
            .in("id", expenseIds);

        if (error) throw error;
    } catch (error) {
        console.error("Error deleting expenses:", error);
        throw new Error("Could not delete expenses");
    }
};
