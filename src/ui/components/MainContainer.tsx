"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Navigation } from "./shared-components/Navigation/Navigation";
import { useProfileStore } from "../stores/useProfileStore";

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfileStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!profile && pathname !== "/add-profile") {
      router.replace("/add-profile");
    }
  }, [profile, pathname, router]);

  return (
    <div className="flex w-full">
      {/* <div className="w-[15%] flex justify-center items-end">
        <Navigation />
      </div> */}
      <div className="w-full sm:w-[85%] lg:w-[70%] md:mx-auto">
        {children}
        <Navigation />
      </div>
    </div>
  );
};


