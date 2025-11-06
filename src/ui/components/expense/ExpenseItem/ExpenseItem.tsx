import { useState, type FC } from "react";
import type { Expense } from "../../../../api/types";
import { Input } from "../../utility-components/Input";
import { Button } from "../../utility-components/Button";
import { TableCell, TableRow } from "../../utility-components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../utility-components/Select";
import { PAYMENT_TYPES, CURRENCIES } from "../expenseConstants";

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
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [newPaymentType, setNewPaymentType] = useState<string>("");
  const [newCurrency, setNewCurrency] = useState<string>("");

  const formatCurrency = (amount: number, currency?: string) => {
    if (!currency) return amount.toFixed(2);
    const currencySymbol = CURRENCIES.find((c) => c.value === currency)?.label.split(" ")[1] || currency;
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  return (
    <TableRow>
      {isEdit ? (
        <div className="position-absolute w-100 gap-1 flex flex-col">
          <div className="flex gap-1">
            <Input
              value={newTitle ? newTitle : title}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              placeholder="Description"
            />
            <Input
              type="number"
              value={newAmount !== null ? newAmount : amount}
              onChange={(e) => {
                setNewAmount(Number(e.target.value));
              }}
              placeholder="Amount"
            />
            <Input
              type="number"
              value={newQuantity !== "" ? newQuantity : (quantity?.toString() || "")}
              onChange={(e) => {
                setNewQuantity(e.target.value);
              }}
              placeholder="Quantity"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex gap-1 mt-1">
            <Select
              value={newPaymentType !== "" ? newPaymentType : (paymentType || "")}
              onValueChange={setNewPaymentType}
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
              value={newCurrency !== "" ? newCurrency : (currency || "USD")}
              onValueChange={setNewCurrency}
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
          <div className="flex gap-1 mt-1">
            <Button
              onClick={() => {
                setIsEdit(false);

                const payload: Partial<Expense> = {
                  description: newTitle ? newTitle : title,
                  amount: newAmount !== null ? newAmount : amount,
                  project_id: projectId,
                  user_id: userId,
                  quantity: newQuantity !== "" ? parseFloat(newQuantity) : quantity,
                  payment_type: newPaymentType !== "" ? newPaymentType : paymentType,
                  currency: newCurrency !== "" ? newCurrency : currency,
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
                setNewTitle("");
                setNewAmount(null);
                setNewQuantity("");
                setNewPaymentType("");
                setNewCurrency("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <TableCell>{title}</TableCell>
          <TableCell>{formatCurrency(amount, currency)}</TableCell>
          <TableCell>{quantity !== undefined && quantity !== null ? quantity : "-"}</TableCell>
          <TableCell>{paymentType ? PAYMENT_TYPES.find((t) => t.value === paymentType)?.label || paymentType : "-"}</TableCell>
          <TableCell>{currency || "-"}</TableCell>
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
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default ExpenseListItem;
