import { useState } from "react";
import type { Expense } from "../../../../api/types";
import { Input } from "../../utility-components/Input";
import AddCategoryDialog from "../../category/AddCategoryDialog/AddCategoryDialog";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import { CategoriesSelect } from "../../category/CategoriesSelect/CategoriesSelect";

type ExpenseFormProps = {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const project = useCurrentProject();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const projectId = project?.id!;
  const { user } = useAuthStore();
  const userId = user?.id;
  const [categoryId, setCategoryId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    onAddExpense({
      description: title,
      amount: parseFloat(amount),
      category_id: categoryId,
      project_id: project?.id ?? "",
      user_id: userId as string,
    });
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
        <CategoriesSelect
          className="mt-3"
          projectId={projectId}
          categoryId={categoryId}
          setCategoryId={(value: string) => setCategoryId(value)}
          placeholder="Select categories"
        />

        <AddCategoryDialog />
      </div>
      <hr className="mt-9" />
      <div className="flex mt-3">
        <Button type="submit" className="mt-1">
          Add expense
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
