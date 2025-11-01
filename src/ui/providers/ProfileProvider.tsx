import { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fechProfileById } from "../../api/adapters/profile";
import { useAuthStore } from "../stores/useAuthStore";
import { useProfileStore } from "../stores/useProfileStore";

type ProfileContextType = {
  profile: any | null;
  isLoading: boolean;
  error: Error | null;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: false,
  error: null,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuthStore();
  const { setProfile } = useProfileStore();

  const { data: profile } = useQuery<any, Error>({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      return await fechProfileById(user.id);
    },
    enabled: !!user?.id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  return <>{children}</>;
};
