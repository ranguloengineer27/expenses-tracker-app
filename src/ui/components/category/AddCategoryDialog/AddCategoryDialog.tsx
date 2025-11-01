import { useState, type FC } from "react";
import { Input } from "../../utility-components/input";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { Button } from "../../utility-components/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../utility-components/Dialog";
import { CategoriesSelect as ParentCategoriesSelect } from "../CategoriesSelect/CategoriesSelect";
import { useCreateCategories } from "../../../hooks/useCategoriesCreation";

type Props = {
};

const AddCategoryDialog: FC = () => {
    const [parentCategoryId, setParentCategoryId] = useState<string>("");
    const [newCategory, setNewCategory] = useState<string>("");
    const project = useCurrentProject();
    const projectId = project?.id ?? "";
    const { mutate: addCategories, isPending } = useCreateCategories(projectId);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="cursor-pointer">Add new category</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Do you want to add a new category?</DialogTitle>
                    <DialogDescription>
                        <Input
                            placeholder="Write new category name"
                            value={newCategory}
                            onChange={(e) => {
                                setNewCategory(e.target.value);
                            }}
                            className="mt-1 mb-3"
                        />
                        <ParentCategoriesSelect
                            projectId={projectId}
                            categoryId={parentCategoryId}
                            setCategoryId={setParentCategoryId}
                            placeholder="Set parent category (optional)"
                            className="w-full mb-2"
                        />
                        <Button
                            onClick={() => {
                                addCategories([
                                    { name: newCategory, project_id: projectId, parent_id: parentCategoryId },
                                ])
                                setNewCategory("");
                            }}
                        >
                            Add
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
