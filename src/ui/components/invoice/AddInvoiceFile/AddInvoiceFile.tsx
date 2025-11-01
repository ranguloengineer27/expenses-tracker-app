import { memo, useCallback, useState, type ChangeEvent, type FC } from "react";
import { extractInvoiceData } from "../../../../api/adapters/invoices";
import { Input } from "../../utility-components/Input";
import type { Expense } from "../../../../api/types";
import { useCurrentProject } from "../../../hooks/useCurrentProject";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import { isMobileDevice } from "../../../helpers/isMobileDevice";

const InputMemoized = memo(Input);

export const ExpensePhotoInput = memo(({ onFileSelected }: { onFileSelected: (file: File) => void }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelected(e.target.files[0]);
        }
    };

    return (
        <div>
            <div>Take a picture of the invoice</div>

            <Input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
            />
        </div>

    );
});

type Props = {
    onAddExpense: (expense: Array<Omit<Expense, "id">>) => Promise<void>;
};

const AddInvoiceFile: FC<Props> = ({ onAddExpense }) => {
    const { user } = useAuthStore();
    const project = useCurrentProject();
    const projectId = project?.id!;
    const userId = user?.id!;
    const [file, setFile] = useState<File | null>(null);

    const updateInvoiceFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileData = e.target?.files?.[0];

        if (!fileData) return;
        setFile(fileData);
    }, []);

    return (
        <>
            <div>
                Upload an invoice from your device
            </div>
            <InputMemoized
                type="file"
                onChange={updateInvoiceFile}
            />

            {isMobileDevice() && <>
                <div>
                    or
                </div>
                <div>
                    <ExpensePhotoInput onFileSelected={InputMemoized} />
                </div>
            </>}
            <Button
                onClick={() => {
                    (async () => {
                        if (!file) return;
                        const data = (
                            await extractInvoiceData(file, userId, projectId)
                        ).filter(({ amount, description }) => !!(amount && description));
                        onAddExpense(data);
                    })();
                }}
            >
                Add
            </Button>
        </>
    );
};

export default AddInvoiceFile;
