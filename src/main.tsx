import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/index.css";
import "./ui/App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./api/clients/queryClient";
import { Toaster } from "./ui/components/utility-components/Toaster";
import { ProfileProvider } from "./ui/providers/ProfileProvider";
import { AuthProvider } from "./ui/providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <Toaster />
          {/* <App /> */}
        </ProfileProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
