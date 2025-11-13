import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Expense } from "../../../../api/types";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useDeleteExpenses } from "../../../hooks/useDeleteExpense";
import { useUpdateExpense } from "../../../hooks/useUpdateExpense";
import { useAuthStore } from "../../../stores/useAuthStore";
import ExpenseListItem from "../ExpenseItem/ExpenseItem";
import { fetchExpensesByProjectId } from "../../../../api/adapters";
import { Table, TableBody, TableHeader, TableHead, TableRow } from "../../utility-components";
import { useState } from "react";
import { Pagination } from "../../utility-components/Pagination";
import { Spinner } from "../../utility-components/Spinner";
import { MAX_ITEMS_BY_PAGE } from "../expenseConstants";
import { setExpensesSizing } from "../expenseHelpers";

const ExpenseList: React.FC = () => {
  const { mutate: mutateExpense } = useUpdateExpense();
  const { mutate: deleteExpensesMutate, isPending } = useDeleteExpenses();
  const project = useCurrentProject();
  const projectId = project?.id!;
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const {
    data: expenses = { data: [], total: 0 },
    isLoading: loadingExpenses,
  } = useQuery<{ data: Expense[]; total: number }>({
    queryKey: ["expenses", projectId, page],
    queryFn: () => fetchExpensesByProjectId(projectId, page, MAX_ITEMS_BY_PAGE),
    enabled: !!projectId,
    placeholderData: keepPreviousData,
  });

  if (loadingExpenses) return <Spinner />;
  if (!expenses?.data?.length) {
    if (expenses?.total === 0) {
      return <div className="mt-5">There's no expenses</div>;
    }
    setPage((currentPage) => {
      if (currentPage >= 1) {
        return currentPage - 1;
      }
      return currentPage;
    });
  }

  const pagesNumber = Math.ceil(expenses.total / MAX_ITEMS_BY_PAGE);
  const { expenseTableHeight } = setExpensesSizing();
  return (
    <>
      <Table style={{ minHeight: expenseTableHeight }}>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.data?.map((expense) => {
            return (
              <ExpenseListItem
                key={expense.id}
                title={expense.description}
                amount={expense.amount}
                quantity={expense.quantity}
                paymentType={expense.payment_type}
                currency={expense.currency}
                updateExpensesList={(id: string, newData: Partial<Expense>) => {
                  mutateExpense({ expenseId: id, updates: newData });
                }}
                deleteExpense={(id: string) => {
                  deleteExpensesMutate([id]);
                }}
                id={expense.id}
                projectId={project?.id!}
                userId={user?.id!}
                categoryId={expense.category_id}
              />
            );
          })}
        </TableBody>
      </Table>
      {expenses?.total > MAX_ITEMS_BY_PAGE ? (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          pages={pagesNumber}
        />
      ) : null}
    </>
  );
};

export default ExpenseList;
