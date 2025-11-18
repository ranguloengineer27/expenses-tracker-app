"use client";

import { ExpenseLogsList } from "../../src/ui/components/log/Logs";
import { MainContainer } from "../../src/ui/components/MainContainer";

export default function LogsPage() {
  return (
    <MainContainer>
      <ExpenseLogsList />
    </MainContainer>
  );
}

