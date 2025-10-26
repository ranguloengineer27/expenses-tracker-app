import { useState } from "react"
import { extractInvoiceData } from "../../api/adapters/invoices"
import Button from "../Button"
import Input from "../Input"

const processFileInvoice = async (invoiceFile: File | null) => {
    if (!invoiceFile) return;

    const expenseData = await extractInvoiceData(invoiceFile);

    console.log('EXPENSE DATA :::', expenseData)
}

const AddInvoiceFile = () => {
    const [file, setFile] = useState<File | null>(null);
    console.log('FILE ::::', file);

    return (
        <>
            <Input type="file" onChange={(e) => {
                const fileData = e.target?.files?.[0];

                if (!fileData) return
                setFile(fileData)
            }} />
            <Button onClick={() => {
                processFileInvoice(file);
            }}>Add</Button></>
    )
}

export default AddInvoiceFile;