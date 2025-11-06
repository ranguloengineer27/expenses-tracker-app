import { useState } from "react";
import type { Expense } from "../../../../api/types";
import { Input } from "../../utility-components/Input";
import AddCategoryDialog from "../../category/AddCategoryDialog/AddCategoryDialog";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import { CategoriesSelect } from "../../category/CategoriesSelect/CategoriesSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../utility-components/Select";
import { PAYMENT_TYPES, CURRENCIES } from "../expenseConstants";

type ExpenseFormProps = {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const project = useCurrentProject();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
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
      quantity: quantity ? parseFloat(quantity) : undefined,
      payment_type: paymentType || undefined,
      currency: currency || undefined,
    });
    setTitle("");
    setAmount("");
    setQuantity("");
    setPaymentType("");
    setCurrency("USD");
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
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div className="mt-1 flex gap-1">
        <CategoriesSelect
          projectId={projectId}
          categoryId={categoryId}
          setCategoryId={(value: string) => setCategoryId(value)}
          placeholder="Select categories"
        />

        <AddCategoryDialog />
      </div>
      <div className="mt-1 flex gap-1">
        <Select
          value={paymentType}
          onValueChange={setPaymentType}
        >
          <SelectTrigger className="min-w-[10rem]">
            <SelectValue placeholder="Payment Type" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={currency}
          onValueChange={setCurrency}
        >
          <SelectTrigger className="min-w-[10rem]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((curr) => (
              <SelectItem key={curr.value} value={curr.value}>
                {curr.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
