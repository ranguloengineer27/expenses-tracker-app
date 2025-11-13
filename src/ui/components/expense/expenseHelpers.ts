import { MAX_ITEMS_BY_PAGE } from "./expenseConstants"
import type { ExpenseFormData, ExpenseFormValidationResult } from "./expenseTypes";

export const setExpensesSizing = (): { expensePageWrapperHeight: string, expenseTableHeight: string } => {
    const expensePageWrapperHeight = `${(MAX_ITEMS_BY_PAGE * 3.66).toFixed(2)}rem`;
    const expenseTableHeight = `${(MAX_ITEMS_BY_PAGE * 3.33).toFixed(2)}rem`;

    return {
        expensePageWrapperHeight,
        expenseTableHeight
    }
}

export function validateExpenseForm(data: ExpenseFormData): ExpenseFormValidationResult {
    const errors: ExpenseFormValidationResult["errors"] = {};
    const trimmedTitle = data?.title?.trim();

    if (!trimmedTitle) {
      errors.title = "Description is required";
    }
  
    const amountValue = parseFloat(String(data.amount));
    if (!amountValue || amountValue <= 0) {
      errors.amount = "Enter a valid amount";
    }
  
    if (!data.paymentType) {
      errors.paymentType = "Select a payment type";
    }
  
    if (!data.categoryId) {
        errors.categoryId = "Select a category";
    }

    if (!data.quantity || (data.quantity && parseFloat(String(data.quantity)) <= 0)) {
        errors.quantity = "Enter a valid quantity";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
