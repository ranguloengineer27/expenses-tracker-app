import ExpenseItem from "../ExpenseItem/ExpenseItem";
import type { Expense } from "../../api/types";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  if (expenses.length === 0) return <p>No hay gastos registrados</p>;

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
