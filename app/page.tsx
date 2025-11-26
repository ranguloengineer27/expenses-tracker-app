"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../src/ui/stores/useAuthStore";
import { isUserAuthenticated } from "../src/ui/helpers/isUserAuthenticated";
import { AuthUI } from "../src/ui/components/auth/AuthUI";
import { Spinner } from "@/ui/components/utility-components/Spinner";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const canUserSeeUI = isUserAuthenticated(user);

  useEffect(() => {
    if (canUserSeeUI) {
      router.replace("/projects");
    }
  }, [canUserSeeUI, router]);

  if(isLoading) {
    <Spinner />
  }

  if (!canUserSeeUI) {
    return <AuthUI />;
  }

  return null; // Will redirect, so return null
}

