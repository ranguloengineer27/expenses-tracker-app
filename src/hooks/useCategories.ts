import { useEffect, useState } from "react";
import type { ExpenseCategory } from "../api/types";
import { addServerCategory, getServerCategories } from "../api/categories";

export const useCategories = () => {
    const serverExpenses = getServerCategories();
    const [category, setCategory] = useState<ExpenseCategory[]>([]);
  
    useEffect(() => {
      if (serverExpenses) setCategory(serverExpenses);
    }, [serverExpenses.length]);
  
    const addCategory = (expense: ExpenseCategory) => {
      addServerCategory(expense);
    };
  
    return { category, addCategory }
}
