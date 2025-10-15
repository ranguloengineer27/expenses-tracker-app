import type { Expense } from "../../api/types";

type ExpenseItemProps = {
  expense: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <li>
      {expense.title}: ${expense.amount.toFixed(2)}
    </li>
  );
};

export default ExpenseItem;
