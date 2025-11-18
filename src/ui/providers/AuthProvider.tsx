import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { createClient as createSupabaseClient } from "../../../app/supabaseClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSession } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const setupAuthSubscription = async () => {
      const supabase = await createSupabaseClient();
      if (!isMounted) return;

      supabase.auth.getSession().then(({ data }) => {
        if (isMounted) {
          setSession(data.session);
        }
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setSession(session);
        }
      });

      unsubscribe = () => listener.subscription.unsubscribe();
    };

    setupAuthSubscription();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [setSession]);

  return <>{children}</>;
};
