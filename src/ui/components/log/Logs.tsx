import { useGetExpenseLogs } from "../../hooks/useGetExpensesLog";
import { useAuthStore } from "../../stores/useAuthStore";

export const ExpenseLogsList = () => {
    const { user } = useAuthStore();
    const { data: logs, isLoading } = useGetExpenseLogs(user?.id);

    if (isLoading) return <p>Loading logs...</p>;
    if (!logs?.length) return <p>No logs found.</p>;

    return (
        <ul>
            {logs.map((log) => (
                <li key={log.id}>
                    [{log.action}] {log.expense_id} — {log.created_at}
                </li>
            ))}
        </ul>
    );
};
