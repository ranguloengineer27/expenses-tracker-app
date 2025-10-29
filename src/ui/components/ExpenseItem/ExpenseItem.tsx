import { useState, type FC } from "react";
import type { Expense } from "../../../api/types";
import List from "../List";
import Input from "../Input";

type ExpenseListItemProps = {
  id?: string;
  title: string;
  amount: number;
  updateExpensesList: (id: string, newData: Expense) => void;
};

const ExpenseListItem: FC<ExpenseListItemProps> = ({
  id,
  title,
  amount,
  updateExpensesList,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | null>(null);

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
          {/* <Button onClick={() => {
        setIsEdit(false);
        updateExpensesList(
          id,
          {
            title: newTitle ? newTitle : title,
            amount: newAmount ? newAmount : amount
          }
        )
      }}>Send</Button> */}
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
            <span className="cursor-pointer">Delete</span>
          </span>
        </>
      )}
    </List.Item>
  );
};

export default ExpenseListItem;
