import { useState, type FC } from "react";
import { Input } from "../../utility-components/Input";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { Button } from "../../utility-components/Button";
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

const AddCategoryDialog: FC = () => {
    const [parentCategoryId, setParentCategoryId] = useState<string>('');
    const [newCategory, setNewCategory] = useState<string>("");
    const project = useCurrentProject();
    const projectId = project?.id ?? "";
    const { mutate: addCategories, isPending } = useCreateCategories(projectId);

    return (
        <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer">
                Add new category
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
                                    { name: newCategory, project_id: projectId, parent_id: parentCategoryId || null },
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
