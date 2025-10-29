import { useState, type FC } from "react";
import Button from "../Button";
import Dialog from "../Dialog";
import Input from "../Input";
import CSS from "./AddCategoryDialog.module.scss";
import type { ExpenseClientCategory } from "../../../api/types";
import { useCurrentProject } from "../../hooks/useCurrentProject";

type Props = {
    addServerCategory: (newCategory: ExpenseClientCategory[]) => void;
};

const AddCategoryDialog: FC<Props> = ({ addServerCategory }) => {
    const [newCategory, setNewCategory] = useState<string>("");
    const project = useCurrentProject();


    return (
        <Dialog>
            <Dialog.Trigger>
                <Button>Add new category</Button>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Header>
                    <span>Do you want to add a new category?</span>
                    <Dialog.Close />
                </Dialog.Header>
                <div className={CSS.DialogInputsWrapper}>
                    <Input
                        placeholder="Write new category name"
                        value={newCategory}
                        onChange={(e) => {
                            setNewCategory(e.target.value);
                        }}
                    />
                    <Button
                        onClick={() => {
                            addServerCategory([{ name: newCategory, project_id: project?.id ?? '' }]);
                            setNewCategory("");
                        }}
                    >
                        Add
                    </Button>
                </div>
            </Dialog.Content>
        </Dialog>
    );
};

export default AddCategoryDialog;
