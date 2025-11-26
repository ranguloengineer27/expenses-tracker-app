import { memo } from "react";
import type { Expense } from "../../../../api/types";
import AddCategoryDialog from "../../category/AddCategoryDialog/AddCategoryDialog";
import { useCurrentProject } from "../../../hooks/project/useCurrentProject";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../utility-components/Select";
import { PAYMENT_TYPES } from "../expenseConstants";
import { InputWithErrorMessage } from "../../../HOC/InputWithErrorMessage";
import { CategoriesSelectWithErrorMessage } from "../../../HOC/CategoriesSelectWithErrorMessage";
import { SelectWithErrorMessage } from "../../../HOC/SelectWithErrorMessage";
import { useExpenseForm } from "../../../hooks/expense/useExpenseForm";

type ExpenseFormProps = {
  onAddExpense: (expense: Array<Omit<Expense, "id">>) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const project = useCurrentProject();
  const { user } = useAuthStore();
  const projectId = project?.id ?? "";
  const userId = user?.id;
  
  const {
    title,
    amount,
    quantity,
    paymentType,
    categoryId,
    currency,
    errors,
    handleFieldChange,
    resetForm,
    validateForm,
  } = useExpenseForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAddExpense([
      {
        description: title || "",
        amount: parseFloat(String(amount) || "0"),
        category_id: categoryId || "",
        project_id: projectId,
        user_id: userId as string,
        quantity: quantity ? parseFloat(String(quantity)) : undefined,
        payment_type: paymentType,
        currency,
      },
    ]);

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <InputWithErrorMessage
          type="text"
          placeholder="Description"
          value={title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          error={errors.title}
        />

        <InputWithErrorMessage
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => handleFieldChange("amount", e.target.value)}
          error={errors.amount}
        />

        <InputWithErrorMessage
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => handleFieldChange("quantity", e.target.value)}
          min="0"
          step="0.01"
          error={errors.quantity}
        />
      </div>

      <div className="mt-2 flex gap-2 items-start">
        <div className="flex-1">
          <CategoriesSelectWithErrorMessage
            className="w-full"
            projectId={projectId}
            categoryId={categoryId ?? ""}
              setCategoryId={(value:string) => handleFieldChange("categoryId", value)}
            placeholder="Select categories"
            error={errors.categoryId}
          />
        </div>

        <AddCategoryDialog />
      </div>

      <div className="mt-2 flex gap-2">
        <div className="flex-1">
          <SelectWithErrorMessage value={paymentType} onValueChange={(value: string) => {
              handleFieldChange("paymentType", value)
          }} error={errors.paymentType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectWithErrorMessage>
        </div>
      </div>

      <div className="flex mt-3">
        <Button type="submit" className="mt-1">
          Add expense
        </Button>
      </div>
    </form>
  );
};

export default memo(ExpenseForm);