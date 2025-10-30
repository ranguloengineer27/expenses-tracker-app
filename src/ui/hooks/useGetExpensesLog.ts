import { useQuery } from "@tanstack/react-query";
import { getExpenseLogs } from "../../api/adapters/log";

export const useGetExpenseLogs = (userId: string | undefined) => {
    return useQuery({
        queryKey: ["expenseLogs", userId],
        queryFn: () => getExpenseLogs(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // cache every 5 minutes
    });
};
