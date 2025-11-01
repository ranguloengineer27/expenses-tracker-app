import { useState, type FC } from "react";
import type { Expense } from "../../../../api/types";
import { Input } from "../../utility-components/input";
import { Button } from "../../utility-components/button";
import { TableCell, TableRow } from "../../utility-components/table";

type ExpenseListItemProps = {
  id?: string;
  title: string;
  amount: number;
  updateExpensesList: (id: string, newData: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  projectId: string;
  userId: string;
};

const ExpenseListItem: FC<ExpenseListItemProps> = ({
  id,
  title,
  amount,
  updateExpensesList,
  deleteExpense,
  projectId,
  userId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | null>(null);

  return (
    <TableRow>
      {isEdit ? (
        <p className="position-absolute w-100 gap-1 flex">
          <Input
            value={newTitle ? newTitle : title}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <Input
            type="number"
            value={newAmount ? newAmount : amount}
            onChange={(e) => {
              setNewAmount(Number(e.target.value));
            }}
          />
          {
            <Button
              onClick={() => {
                setIsEdit(false);

                const payload = {
                  description: newTitle ? newTitle : title,
                  amount: newAmount ? newAmount : amount,
                  project_id: projectId,
                  user_id: userId,
                };

                updateExpensesList(id!, payload);
              }}
            >
              Send
            </Button>
          }
        </p>
      ) : (
        <>
          <TableCell>{title}</TableCell>
          <TableCell>{amount?.toFixed(2)}</TableCell>
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
