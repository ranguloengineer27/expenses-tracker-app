import { useState, useEffect } from "react";
import type { Expense, ExpenseCategory } from "./api/types";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./_globals.scss";
import { addServerExpense, getServerExpenses } from "./api/expenses";
import { addServerCategory, getCategories } from "./api/categories";
import { useExpenses } from "./hooks/useExpenses";
import { useExpenseData } from "./hooks/useExpenseData";

function App() {
  const [expenses, addExpense] = useExpenseData<Expense>(getServerExpenses, addServerExpense);
  const [categories, addCategory] = useExpenseData<ExpenseCategory>(getServerExpenses, addServerCategory);

  //const [categories, setCategories] = useState<ExpenseCategory[]>([]);


  
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="">
      <div>
        <h1>Expenses tracker</h1>
        <ExpenseForm onAddExpense={addExpense} categories={categories} />
        <ExpenseList expenses={expenses} />
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
