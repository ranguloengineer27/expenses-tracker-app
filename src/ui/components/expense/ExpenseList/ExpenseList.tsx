import type { Expense } from "../../../../api/types";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useDeleteExpenses } from "../../../hooks/useDeleteExpense";
import { useUpdateExpense } from "../../../hooks/useUpdateExpense";
import { useAuthStore } from "../../../stores/useAuthStore";
import List from "../../utility-components/List";
import ExpenseListItem from "../ExpenseItem/ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
};

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
}) => {
  if (expenses.length === 0) return <p>There's no expenses registered</p>;

  const { mutate: mutateExpense } = useUpdateExpense();
  const { mutate: deleteExpensesMutate, isPending } = useDeleteExpenses();
  const project = useCurrentProject();
  const { user } = useAuthStore();

  return (
    <List>
      {expenses?.map((expense) => {
        return (
          <ExpenseListItem
            key={`${expense?.description}-${expense.amount}`}
            title={expense.description}
            amount={expense.amount}
            updateExpensesList={(id: string, newData: Partial<Expense>) => {
              mutateExpense({ expenseId: id, updates: newData });
            }}
            deleteExpense={(id: string) => {
              deleteExpensesMutate([id]);
            }}
            id={expense.id}
            projectId={project?.id!}
            userId={user?.id!}
          />
        );
      })}
    </List>
  );
};

export default ExpenseList;
