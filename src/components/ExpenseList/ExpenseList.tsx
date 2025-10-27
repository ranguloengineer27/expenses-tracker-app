import type { Expense, ExpenseClient } from "../../api/types";
import List from "../List";
import ExpenseListItem from "../ExpenseItem/ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[] | ExpenseClient[];
  updateExpensesList: (id: string, newData: ExpenseClient) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, updateExpensesList }) => {
  if (expenses.length === 0) return <p>No hay gastos registrados</p>;

  return (
    <List>
      {expenses.map((expense) => {
        return (
          <ExpenseListItem
            title={expense.title}
            amount={expense.amount}
            id={expense?.id ?? ''}
            updateExpensesList={updateExpensesList}
          />
        )
      })
      }
    </List >
  );
};

export default ExpenseList;
