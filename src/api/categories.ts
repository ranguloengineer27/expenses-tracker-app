import type { ExpenseCategory } from "./types"

export const getServerCategories = () => localStorage.getItem("expenses_categories")
    ? JSON.parse(localStorage.getItem("expenses_categories") as string)
    : []

export const addServerCategory = (expense:ExpenseCategory) => {
    localStorage.setItem("expenses_categories", JSON.stringify([...getServerCategories(), expense]))
}