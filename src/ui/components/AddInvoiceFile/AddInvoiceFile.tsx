import { useState, type FC } from "react";
import { extractInvoiceData } from "../../../api/adapters/invoices";
import Button from "../Button";
import Input from "../Input";
import type { Expense } from "../../../api/types";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentProject } from "../../hooks/useCurrentProject";

type Props = {
    onAddExpense: (expense: Expense[]) => Promise<void>;
};

const AddInvoiceFile: FC<Props> = ({ onAddExpense }) => {
    const { user } = useAuth();
    const project = useCurrentProject();
    const projectId = project?.id!;
    const userId = user?.id!;
    const [file, setFile] = useState<File | null>(null);

    return (
        <>
            <Input
                type="file"
                onChange={(e) => {
                    const fileData = e.target?.files?.[0];

                    if (!fileData) return;
                    setFile(fileData);
                }}
            />
            <Button
                onClick={() => {
                    (async () => {
                        if (!file) return
                        const data = (
                            await extractInvoiceData(file, userId, projectId))
                            .filter(({ amount, description }) => !!(amount && description));
                        onAddExpense(data);
                    })();
                }}
            >
                Add
            </Button >
        </>
    );
};

export default AddInvoiceFile;
