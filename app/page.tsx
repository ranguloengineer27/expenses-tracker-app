"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../src/ui/stores/useAuthStore";
import { isUserAuthenticated } from "../src/ui/helpers/isUserAuthenticated";
import { AuthUI } from "../src/ui/components/auth/AuthUI";
import { MainContainer } from "../src/ui/components/MainContainer";

export default function HomePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const canUserSeeUI = isUserAuthenticated(user);

  useEffect(() => {
    if (canUserSeeUI) {
      router.replace("/projects");
    }
  }, [canUserSeeUI, router]);

  if (!canUserSeeUI) {
    return <AuthUI />;
  }

  return null; // Will redirect, so return null
}

