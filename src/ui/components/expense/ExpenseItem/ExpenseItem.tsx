import { useState, type FC } from "react";
import type { Expense } from "../../../../api/types";
import List from "../../utility-components/List";
import Input from "../../utility-components/Input";
import Button from "../../utility-components/Button";

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
  userId
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | null>(null);
  /* const project = useCurrentProject();
  const { user } = useAuthStore(); */

  return (
    <List.Item
      className="flex w-100 justify-content-between position-relative"
      key={id}
    >
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
          {<Button onClick={() => {
            setIsEdit(false);

            const payload = {
              description: newTitle ? newTitle : title,
              amount: newAmount ? newAmount : amount,
              project_id: projectId,
              user_id: userId
            }

            console.log('PAYLOAD :::', payload)
            console.log('EXPENSE ID :::', id)


            updateExpensesList(
              id!,
              payload
            )
          }}>Send</Button>}
        </p>
      ) : (
        <>
          <span>
            {title}: ${amount?.toFixed(2)}
          </span>
          <span className="flex justify-content-between w-10">
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </span>
            <span className="cursor-pointer" onClick={() => {
              deleteExpense(id!);
            }}>Delete</span>
          </span>
        </>
      )}
    </List.Item>
  );
};

export default ExpenseListItem;
