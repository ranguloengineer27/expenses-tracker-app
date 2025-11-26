import { useState, type FC } from "react";
import type { Expense } from "../../../../api/types";
import { Button } from "../../utility-components/Button";
import { TableCell, TableRow } from "../../utility-components";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../utility-components/Select";
import { PAYMENT_TYPES } from "../expenseConstants";
import { InputWithErrorMessage } from "../../../HOC/InputWithErrorMessage";
import { SelectWithErrorMessage } from "../../../HOC/SelectWithErrorMessage";
import { useExpenseForm } from "../../../hooks/expense/useExpenseForm";
import { CategoriesSelectWithErrorMessage } from "../../../HOC/CategoriesSelectWithErrorMessage";

type ExpenseListItemProps = {
  id?: string;
  title: string;
  amount: number;
  quantity?: number;
  paymentType?: string;
  currency?: string;
  updateExpensesList: (id: string, newData: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  projectId: string;
  userId: string;
  categoryId?:string | null;
};

const ExpenseListItem: FC<ExpenseListItemProps> = ({
  id,
  title,
  amount,
  quantity,
  paymentType,
  currency,
  updateExpensesList,
  deleteExpense,
  projectId,
  userId,
  categoryId
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const {
    title: formTitle,
    amount: formAmount,
    quantity: formQuantity,
    paymentType: formPaymentType,
    currency: formCurrency,
    categoryId: formCategoryId,
    handleFieldChange,
    errors
  } = useExpenseForm({ title, amount, quantity, paymentType, categoryId: categoryId! });

  return (
    <>
    <TableRow>
      {isEdit ? (
        <TableCell className="position-absolute w-100 gap-1 flex flex-col">
          <TableCell className="flex gap-1">
            <InputWithErrorMessage
              value={formTitle}
              onChange={(e) => {
                handleFieldChange("title", e.target.value);
              }}
              placeholder="Description"
              error={errors.title}
            />
            <InputWithErrorMessage
              type="number"
              value={formAmount}
              onChange={(e) => {
                handleFieldChange("amount", e.target.value);
              }}
              placeholder="Amount"
              error={errors.amount}
            />
            <InputWithErrorMessage
              type="number"
              value={formQuantity || quantity?.toString() || ""}
              onChange={(e) => {
                handleFieldChange("quantity", e.target.value);
              }}
              min="0"
              step="0.01"
              error={errors.quantity}
            />
          </TableCell>
          <TableCell className="flex gap-1 mt-1">
            <CategoriesSelectWithErrorMessage
              projectId={projectId}
              categoryId={formCategoryId ?? ""}
                setCategoryId={(value:string) => handleFieldChange("categoryId", value)}
              placeholder="Select categories"
              error={errors.categoryId}
          />
            <SelectWithErrorMessage
              value={formPaymentType || paymentType || ""}
              onValueChange={(value) => handleFieldChange("paymentType", value)}
              error={errors.paymentType}
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
            </SelectWithErrorMessage>
          </TableCell>
          <TableCell className="flex gap-1 mt-1">
            <Button
              onClick={() => {
                setIsEdit(false);

                const payload: Partial<Expense> = {
                  description: formTitle || title,
                  amount: formAmount ? parseFloat(String(formAmount)) : amount,
                  project_id: projectId,
                  user_id: userId,
                  quantity: formQuantity ? parseFloat(String(formQuantity)) : quantity,
                  payment_type: formPaymentType || paymentType,
                  currency: formCurrency || currency,
                };

                updateExpensesList(id!, payload);
              }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
          </TableCell>
        </TableCell>
      ) : (
        <>
          <TableCell>{title}</TableCell>
          <TableCell>{amount} {currency}</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
              className="mr-1"
            >
              Edit
            </Button>
            <Button
              variant={"destructive"}
              className="ml-1"
              onClick={() => {
                deleteExpense(id!);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setShowDetails((prev) => !prev);
              }}
              className="ml-1"
            >
              See details
            </Button>
          </TableCell>
        </>
      )}
      
    </TableRow>
     {showDetails && 
      <TableRow>
        <TableCell>Quantity: {quantity !== undefined && quantity !== null ? quantity : "-"}</TableCell>
        <TableCell>Payment: {paymentType ? PAYMENT_TYPES.find((t) => t.value === paymentType)?.label || paymentType : "-"}</TableCell>
     </TableRow>
    }
    </>
  );
};

export default ExpenseListItem;
