import { useState } from "react";
import type { Expense, ExpenseCategory } from "../../api/types";
import CSS from "./ExpenseForm.module.scss"

type ExpenseFormProps = {
  onAddExpense: (expense: Expense) => void;
  categories: ExpenseCategory[]
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, categories }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    onAddExpense({ id: Date.now(), title, amount: parseFloat(amount) });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className={CSS.ExpenseForm}>
      <div className={CSS.ExpenseForm__Wrapper}>
        <label>
          <input
            type="text"
            placeholder="Description"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        {categories?.length && <select name="" id="">
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        }

        {/* <div>
          <button onClick={}>Add category</button>
        </div> */}
      </div>
      <button type="submit" className="mt-1">Add expense</button>
    </form>
  );
};

export default ExpenseForm;
