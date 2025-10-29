import { useState } from "react";
import type { Expense } from "../../api/types";
import Button from "../components/Button";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import AddInvoiceFile from "../components/AddInvoiceFile/AddInvoiceFile";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import { fetchExpensesByProjectId } from "../../api/adapters";
import { useQuery } from "@tanstack/react-query";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { withLoader } from "../HOC/withLoader";
import { useAddExpenses } from "../hooks/useAddExpenses";

const Tabs = {
    manual: "manual",
    file: "file",
} as const;

const ExpenseListComponent = withLoader(ExpenseList);

const ExpensesAdding = () => {
    const projectId = useCurrentProject()?.id!;
    const { data: expenses = [], isLoading: loadingExpenses } = useQuery<
        Expense[]
    >({
        queryKey: ["expenses", projectId!],
        queryFn: () => fetchExpensesByProjectId(projectId!),
        enabled: !!projectId,
    });
    const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.manual);
    const { mutate: addExpenses, isPending } = useAddExpenses();

    return (
        <div className="w-100">
            <div>
                <div>
                    <Button onClick={() => setTab(Tabs.manual)}>Add it mannually</Button>
                    <Button onClick={() => setTab(Tabs.file)}>Add a file</Button>
                </div>
                <div className="min-h-11">
                    {tab === Tabs.manual ? (
                        <ExpenseForm
                            onAddExpense={async (expense: Expense) => {
                                addExpenses([expense])
                            }}
                        />
                    ) : (
                        <div className="transform-y-3">
                            <AddInvoiceFile
                                onAddExpense={async (expenses: Expense[]) => {
                                    addExpenses(expenses)
                                }}
                            />
                        </div>
                    )}
                </div>
                <ExpenseListComponent
                    isLoading={loadingExpenses}
                    expenses={expenses}
                    updateExpensesList={(id: string, newData: Expense) => {
                        /* const expenseIndex = expensesCollection.findIndex(
                            (expense) => expense.id === id,
                        );
                        const newList = [...expensesCollection];

                        newList[expenseIndex] = {
                            ...newList[expenseIndex],
                            ...newData,
                        }; */

                        //setExpenses(newList);
                    }}
                />
            </div>
        </div>
    );
};

export default ExpensesAdding;
