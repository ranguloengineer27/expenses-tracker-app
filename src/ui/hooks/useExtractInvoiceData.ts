import { useMutation } from "@tanstack/react-query";
import { extractInvoiceData } from "../../api/adapters/invoices";

type ExtractInvoiceDataParams = {
    file: File;
    userId: string;
    projectId: string;
};

export const useExtractInvoiceData = () => {
    return useMutation({
        mutationFn: async ({ file, userId, projectId }: ExtractInvoiceDataParams) => {
            const data = await extractInvoiceData(file, userId, projectId);
            return data.filter(({ amount, description }) => !!(amount && description));
        },
    });
};
