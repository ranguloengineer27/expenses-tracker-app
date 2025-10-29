import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { fechProfileById } from "../../api/adapters/profile";

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
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<any, Error>({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      return await fechProfileById(user.id);
    },
    enabled: !!user?.id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};
