import type { Expense, ExpenseClient } from "../types"
import { v4 as uuid } from 'uuid';

export const getServerExpenses = async (): Promise<Expense[] | undefined> => {
    try {
        const expensesData = await localStorage.getItem("expenses");

        if (expensesData) {
            return JSON.parse(expensesData)
        }
    } catch (e) {
        throw new Error(`Error getting expense ${e}`)
    }
}

export const addServerExpense = async (expense: ExpenseClient): Promise<Expense[] | undefined> => {
    try {
        const expenses = await getServerExpenses() ?? [];

        localStorage.setItem("expenses", JSON.stringify([...expenses, { ...expense, id: uuid() }]));

        return await getServerExpenses();
    } catch (e) {
        throw new Error(`Error adding expense ${e}`)
    }
}