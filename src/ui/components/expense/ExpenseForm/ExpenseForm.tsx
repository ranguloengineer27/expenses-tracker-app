import { useState } from "react";
import type { Expense, ExpenseClientCategory } from "../../../../api/types";
import Select from "../../utility-components/Select";
import Input from "../../utility-components/Input";
import Button from "../../utility-components/Button";
import AddCategoryDialog from "../../AddCategoryDialog/AddCategoryDialog";
import { fetchCategories } from "../../../../api/adapters";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useQuery } from "@tanstack/react-query";
import { useCreateCategories } from "../../../hooks/useCategoriesCreation";
import { useAuthStore } from "../../../stores/useAuthStore";

type ExpenseFormProps = {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const project = useCurrentProject();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const projectId = project?.id!;
  const { user } = useAuthStore();
  const userId = user?.id;
  const { mutate: addCategories, isPending } = useCreateCategories(projectId);

  const { data: categoriesData } = useQuery({
    queryKey: ['categories', projectId],
    queryFn: () => fetchCategories(projectId),
    enabled: !!projectId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    onAddExpense({
      description: title,
      amount: parseFloat(amount),
      category_id: categoryId,
      project_id: project?.id ?? '',
      user_id: userId as string
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
        <div className="pt-10 w-30">
          {categoriesData?.length ? (
            <>
              <Select
                aria-placeholder="Select Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <Select.Option value="" disabled hidden>
                  Select an option...
                </Select.Option>
                {categoriesData.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </>
          ) : null}
        </div>

        <AddCategoryDialog
          addServerCategory={async (newCats: ExpenseClientCategory[]) => {
            addCategories(newCats);
          }}
        />
      </div>
      <Button type="submit" className="mt-1">
        Add expense
      </Button>
    </form>
  );
};

export default ExpenseForm;
