"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/api/clients/queryClient";
import { AuthProvider } from "../src/ui/providers/AuthProvider";
import { ProfileProvider } from "../src/ui/providers/ProfileProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../src/ui/components/utility-components/Toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <Toaster />
          {children}
        </ProfileProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

