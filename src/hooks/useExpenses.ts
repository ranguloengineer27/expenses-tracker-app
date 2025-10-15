import { useEffect, useState } from "react";
import type { Expense } from "../api/types";
import { addServerExpense, getServerExpenses } from "../api/expenses";

export const useExpenses = () => {
  const serverExpenses = getServerExpenses();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (serverExpenses) setExpenses(serverExpenses);
  }, [serverExpenses.length]);

  const addExpense = (expense: Expense) => {
    addServerExpense(expense);
  };

  return { expenses, addExpense }
}