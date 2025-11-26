import { useCallback, useState } from "react";
import type { ExpenseFormData, ExpenseFormErrors } from "../../components/expense/expenseTypes";
import { validateExpenseForm } from "../../components/expense/expenseHelpers";

const EXPENSE_FORM_FIELDS = {
  TITLE: "title",
  AMOUNT: "amount",
  QUANTITY: "quantity",
  PAYMENT_TYPE: "paymentType",
  CURRENCY: "currency",
  CATEGORY_ID: "categoryId",
} as const;

export const useExpenseForm = ({
    title:defaultTitle,
    amount:defaultAmount,
    quantity:defaultQuantity,
    paymentType:defaultPaymentType,
    categoryId:defaultCategoryId
}:ExpenseFormData = {}) => {
  const [title, setTitle] = useState<string>(defaultTitle ?? "");
  const [amount, setAmount] = useState<number|string>(defaultAmount ?? "");
  const [quantity, setQuantity] = useState<string|number>(defaultQuantity ?? "");
  const [paymentType, setPaymentType] = useState<string>(defaultPaymentType ?? "");
  const [categoryId, setCategoryId] = useState<string>(defaultCategoryId ?? "");
  const [currency, setCurrency] = useState<string>();
  const [errors, setErrors] = useState<ExpenseFormErrors>({});

  const handleFieldChange = useCallback((field: keyof ExpenseFormData, value: string) => {
    switch (field) {
      case EXPENSE_FORM_FIELDS.TITLE:
        setTitle(value);
        break;
      case EXPENSE_FORM_FIELDS.AMOUNT:
        setAmount(value);
        break;
      case EXPENSE_FORM_FIELDS.QUANTITY:
        setQuantity(value);
        break;
      case EXPENSE_FORM_FIELDS.PAYMENT_TYPE:
        setPaymentType(value);
        break;
      case EXPENSE_FORM_FIELDS.CURRENCY:
        setCurrency(value);
        break;
      case EXPENSE_FORM_FIELDS.CATEGORY_ID:
        setCategoryId(value);
        break;
    }

    setErrors((prev) => {
      if (prev[field]) {
        return { ...prev, [field]: undefined };
      }
      return prev;
    });
  }, []);

  const resetForm = useCallback(() => {
    setTitle("");
    setAmount("");
    setQuantity("");
    setPaymentType("");
    setCurrency("");
    setCategoryId("");
    setErrors({});
  }, []);

  const validateForm = useCallback((): boolean => {
    const { isValid, errors } = validateExpenseForm({ title, amount, paymentType, currency, categoryId, quantity });
    setErrors(errors);
    return isValid;
  }, [title, amount, paymentType, categoryId, quantity]);

  return {
    title,
    amount,
    quantity,
    paymentType,
    categoryId,
    currency,
    errors,
    setErrors,
    handleFieldChange,
    resetForm,
    validateForm,
  };
};

