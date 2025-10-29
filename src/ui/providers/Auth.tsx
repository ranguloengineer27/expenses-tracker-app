import { createContext, useEffect, useState, type ReactNode } from "react";
import { type Session, type User } from "@supabase/supabase-js";
import { supabaseClient } from "../../api/clients/supabaseClient";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${import.meta.env.VITE_APPLICATION_URL}/add-profile`,
      },
    });
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
