import { useState, type FC } from "react"
import { extractInvoiceData } from "../../api/adapters/invoices"
import Button from "../Button"
import Input from "../Input"
import type { ExpenseClient } from "../../api/types"

const getExpensesFromInvoiceFile = async (invoiceFile: File | null): Promise<ExpenseClient[]> => {
    if (!invoiceFile) [];

    return await extractInvoiceData(invoiceFile!);
}

type Props = {
    setExpenses: (expenses: ExpenseClient[]) => void
}

const AddInvoiceFile: FC<Props> = ({ setExpenses }) => {
    const [file, setFile] = useState<File | null>(null);

    return (
        <>
            <Input type="file" onChange={(e) => {
                const fileData = e.target?.files?.[0];

                if (!fileData) return
                setFile(fileData)
            }} />
            <Button onClick={() => {
                (async () => {
                    const data = await getExpensesFromInvoiceFile(file);
                    setExpenses(data);
                })();
            }}>Add</Button></>
    )
}

export default AddInvoiceFile;