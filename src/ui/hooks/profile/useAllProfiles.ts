import { fetchAllProfiles } from "@/api/adapters/profile";
import { useQuery } from "@tanstack/react-query";

export const useAllProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: fetchAllProfiles,
  });
};
