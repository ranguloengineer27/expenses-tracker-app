import { useState } from "react";
import type { Expense } from "../../../../api/types";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import AddInvoiceFile from "../../invoice/AddInvoiceFile/AddInvoiceFile";
import { useAddExpenses } from "../../../hooks/useAddExpenses";
import { Button } from "../../utility-components/Button";
import { toast } from "sonner";

const Tabs = {
    manual: "manual",
    file: "file",
} as const;

const ExpensesAdding = () => {
    const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.manual);
    const { mutate: addExpenses, isPending } = useAddExpenses();

    return (
        <div className="w-full">
            <div>
                <div>
                    <Button
                        variant={tab !== Tabs.manual ? "secondary" : "default"}
                        onClick={() => setTab(Tabs.manual)}
                        className="mr-2 cursor-pointer"
                    >
                        Add it mannually
                    </Button>
                    <Button
                        variant={tab !== Tabs.file ? "secondary" : "default"}
                        onClick={() => setTab(Tabs.file)}
                        className="ml-2 cursor-pointer"
                    >
                        Add a file
                    </Button>
                </div>
                <div className="min-h-11">
                    {tab === Tabs.manual ? (
                        <ExpenseForm
                            onAddExpense={async (expense: Omit<Expense, "id">) => {
                                addExpenses([expense]);
                            }}
                        />
                    ) : (
                        <div className="transform-y-3">
                            <AddInvoiceFile
                                isFileLoading={isPending}
                                onAddExpense={async (expenses: Array<Omit<Expense, "id">>) => {
                                    addExpenses(expenses, {
                                        onSuccess: () => {
                                            toast.success("Expenses added successfully");
                                        },
                                        onError: (error) => {
                                            toast.error(error.message);
                                        },
                                    });
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpensesAdding;
