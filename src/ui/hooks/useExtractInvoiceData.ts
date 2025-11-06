import { useMutation } from "@tanstack/react-query";
import { extractInvoiceData } from "../../api/adapters/invoices";

type ExtractInvoiceDataParams = {
    file: File;
    userId: string;
    projectId: string;
    token: string;
};

export const useExtractInvoiceData = () => {
    return useMutation({
        mutationFn: async ({ file, userId, projectId, token }: ExtractInvoiceDataParams) => {
            const data = await extractInvoiceData(file, userId, projectId, token);
            return data.filter(({ amount, description }) => !!(amount && description));
        },
    });
};
