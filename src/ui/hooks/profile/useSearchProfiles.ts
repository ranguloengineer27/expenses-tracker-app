"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProfileByName } from "@/api/adapters/profile";

export function useSearchProfiles(search:string) {
  return useQuery({
    queryKey: ["profiles-search"],
    queryFn: () => fetchProfileByName(search),
    enabled: !!search, // avoid running when empty
    staleTime: 1000 * 15, // cache 15s
  });
}
