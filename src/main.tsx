import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/index.css";
import "./ui/App.css";
import App from "./ui/App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/clients/queryClient.ts";
import { AuthProvider } from "./ui/providers/AuthProvider.tsx";
import { ProfileProvider } from "./ui/providers/ProfileProvider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
