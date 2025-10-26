import type { ExpenseCategory } from "../types";
import { v4 as uuid } from 'uuid';

export const getServerCategories = async (): Promise<ExpenseCategory[]> => {
    try {
        return await localStorage.getItem("expenses_categories")
            ? await JSON.parse(localStorage.getItem("expenses_categories") as string)
            : [];
    } catch (e) {
        throw new Error(`Error getting categories :: ${e}`);
    }
}

export const addServerCategory = async (expense: string): Promise<ExpenseCategory[] | undefined> => {
    const id = uuid();

    try {
        const serverCategories = await getServerCategories();
        localStorage.setItem("expenses_categories", JSON.stringify([...serverCategories, { name: expense, id }]))

        return await getServerCategories();

    } catch (e) {
        throw new Error(`Error adding categories :: ${e}`);
    }
}