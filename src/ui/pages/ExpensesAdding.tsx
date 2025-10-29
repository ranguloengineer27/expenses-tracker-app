import { useState } from "react";
import type { Expense, ExpenseClient } from "../../api/types";
import Button from "../components/Button";
import { addServerExpense } from "../../api/adapters";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import AddInvoiceFile from "../components/AddInvoiceFile/AddInvoiceFile";
import ExpenseList from "../components/ExpenseList/ExpenseList";

const Tabs = {
    manual: "manual",
    file: "file",
} as const

const ExpensesAdding = () => {
    const [expenses, setExpenses] = useState<Expense[] | ExpenseClient[]>([]);
    const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.manual);

    return (<div className="w-100">
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
                {tab === Tabs.manual
                    ? <ExpenseForm
                        onAddExpense={async (expense: ExpenseClient) => {
                            const expensesData = await addServerExpense([expense]);
                            if (!expensesData) return;

                            setExpenses(expensesData);
                        }}
                    />
                    : <div className="transform-y-3">
                        <AddInvoiceFile setExpenses={setExpenses} />
                    </div>}
            </div>
            <ExpenseList expenses={expenses} updateExpensesList={(id: string, newData: ExpenseClient) => {
                const expenseIndex = expenses.findIndex((expense) => expense.id === id);
                const newList = [...expenses];

                newList[expenseIndex] = {
                    ...newList[expenseIndex],
                    ...newData
                }

                setExpenses(newList);
            }} />
            {tab === Tabs.file && <div>Confirm expenses</div>}
        </div>
    </div>)
}

export default ExpensesAdding;