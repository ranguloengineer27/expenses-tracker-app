import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { supabaseClient } from "../../api/clients/supabaseClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  return <>{children}</>;
};
