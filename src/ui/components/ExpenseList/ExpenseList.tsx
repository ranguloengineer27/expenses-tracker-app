import type { Expense } from "../../../api/types";
import List from "../List";
import ExpenseListItem from "../ExpenseItem/ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  updateExpensesList: (id: string, newData: Expense) => void;
};

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  updateExpensesList,
}) => {
  if (expenses.length === 0) return <p>There's no expenses registered</p>;

  return (
    <List>
      {expenses?.map((expense) => {
        return (
          <ExpenseListItem
            key={`${expense?.description}-${expense.amount}`}
            title={expense.description}
            amount={expense.amount}
            updateExpensesList={updateExpensesList}
          />
        );
      })}
    </List>
  );
};

export default ExpenseList;
