import { useState, useEffect } from "react";
import type { Expense, ExpenseClient } from "./api/types";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./_globals.scss";
import { addServerExpense, getServerExpenses } from "./api/adapters/expense";
import Button from "./components/Button";
import AddInvoiceFile from "./components/AddInvoiceFile/AddInvoiceFile";


const Tabs = {
  manual: "manual",
  file: "file",
} as const

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.manual);


  useEffect(() => {
    (async () => {
      const data = await getServerExpenses();
      if (!data) return;

      setExpenses(data)
    })()
  }, [])

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="w-100">
      <div>
        <h1>Expenses tracker</h1>
        <div>
          <Button onClick={() => setTab(Tabs.manual)}>
            Add it mannually
          </Button>

          <Button onClick={() => setTab(Tabs.file)}>
            Add a file
          </Button>
        </div>
        <div className="min-h-11">
          {tab === Tabs.manual ? <ExpenseForm onAddExpense={async (expense: ExpenseClient) => {
            const expensesData = await addServerExpense(expense);
            if (!expensesData) return;

            setExpenses(expensesData);
          }} />
            : <div className="transform-y-3">
              <AddInvoiceFile />
            </div>}
        </div>
        <ExpenseList expenses={expenses} />
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
