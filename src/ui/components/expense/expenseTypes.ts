export interface ExpenseFormData {
    title?: string;
    amount?: string | number;
    paymentType?: string;
    currency?: string;
    categoryId?: string;
    quantity?: string | number;
  }
  
  export interface ExpenseFormErrors {
    title?: string;
    amount?: string;
    paymentType?: string;
    currency?: string;
    categoryId?: string;
    quantity?: string;
  }
  
  export interface ExpenseFormValidationResult {
    isValid: boolean;
    errors: ExpenseFormErrors;
  }
  