import { useEffect, useState } from "react";
import type { ExpenseCategory, ExpenseClient } from "../../api/types";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";
import AddCategoryDialog from "../AddCategoryDialog/AddCategoryDialog";
import { addServerCategory, getServerCategories } from "../../api/adapters/category";

type ExpenseFormProps = {
  onAddExpense: (expense: ExpenseClient) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<ExpenseCategory[]>();

  useEffect(() => {
    (async () => {
      const serverCategories = await getServerCategories();
      setCategories(serverCategories);
    })()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    onAddExpense({ title, amount: parseFloat(amount), categoryId });
    setTitle("");
    setAmount("");
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1">
        <Input
          type="text"
          placeholder="Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-1 flex gap-1">
        <div className="pt-10 w-30">
          {categories?.length ? <>
            <Select aria-placeholder="Select Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <Select.Option value="" disabled hidden>
                Select an option...
              </Select.Option>
              {categories.map((category) => <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)}
            </Select>
          </> : null
          }
        </div>

        <AddCategoryDialog
          addServerCategory={async (newCat) => {
            const newCategories = await addServerCategory(newCat);
            setCategories(newCategories);
          }}
        />
      </div>
      <Button type="submit" className="mt-1">Add expense</Button>
    </form>
  );
};

export default ExpenseForm;
