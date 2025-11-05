import { MAX_ITEMS_BY_PAGE } from "./expenseConstants"

export const setExpensesSizing = (): { expensePageWrapperHeight: string, expenseTableHeight: string } => {
    const expensePageWrapperHeight = `${(MAX_ITEMS_BY_PAGE * 3.66).toFixed(2)}rem`;
    const expenseTableHeight = `${(MAX_ITEMS_BY_PAGE * 3.33).toFixed(2)}rem`;

    return {
        expensePageWrapperHeight,
        expenseTableHeight
    }
}