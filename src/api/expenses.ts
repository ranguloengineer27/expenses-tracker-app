import type { Expense } from "./types"

export const getServerExpenses = () => localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses") as string)
    : []

export const addServerExpense = (expense:Expense) => {
    localStorage.setItem("expenses", JSON.stringify([...getServerExpenses(), expense]))
}