import { logActions, type LogActionsType } from "../../../api/types/log";
import { useGetExpenseLogs } from "../../hooks/useGetExpensesLog";
import { useAuthStore } from "../../stores/useAuthStore";
import List from "../utility-components/List";

const displayLog = (action: LogActionsType, payload: any) => {
  /* if (action === logActions.create) { */
  return (
    <>
      <span>Data: </span>
      <span>
        {payload.description}
        {" - "}
      </span>
      <span>{payload.amount}</span>
    </>
  );
  /* } */
};

export const ExpenseLogsList = () => {
  const { user } = useAuthStore();
  const { data: logs, isLoading } = useGetExpenseLogs(user?.id);

  if (isLoading) return <p>Loading logs...</p>;
  if (!logs?.length) return <p>No logs found.</p>;

  console.log("LOGS :::", logs);

  return (
    <List>
      {logs.map((log) => (
        <List.Item key={log.id}>
          <span className="block">
            [{log.action}] — {log.created_at}
          </span>{" "}
          |{displayLog(log.action, log.payload)}
        </List.Item>
      ))}
    </List>
  );
};
