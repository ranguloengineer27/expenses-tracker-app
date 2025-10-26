import { useState, type FC } from "react";
import Button from "../Button";
import Dialog from "../Dialog";
import Input from "../Input";
import CSS from './AddCategoryDialog.module.scss'

type Props = {
    addServerCategory: (newCategory: string) => void;
}

const AddCategoryDialog: FC<Props> = ({
    addServerCategory }) => {
    const [newCategory, setNewCategory] = useState<string>('');

    return <Dialog>
        <Dialog.Trigger>
            <Button>
                Add new category
            </Button>
        </Dialog.Trigger>

        <Dialog.Content>
            <Dialog.Header>
                <span>Do you want to add a new category?</span>
                <Dialog.Close />
            </Dialog.Header>
            <div className={CSS.DialogInputsWrapper}>
                <Input placeholder="Write new category name" value={newCategory} onChange={(e) => {
                    setNewCategory(e.target.value)
                }} />
                <Button onClick={() => {
                    addServerCategory(newCategory);
                    setNewCategory('');
                }}>Add</Button>
            </div>
        </Dialog.Content>
    </Dialog>
}

export default AddCategoryDialog;