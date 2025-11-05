import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Input } from "../utility-components/Input";
import { Button } from "../utility-components/Button";

interface SignInProps {
  onForgotPassword?: () => void;
}

export const SignIn = ({ onForgotPassword }: SignInProps) => {
  const { signInWithPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signInWithPassword(email, password);
    } catch (err: any) {
      setError(err.message ?? "Sign in failed");
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
      <h1>Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignIn}>Sign In</Button>
      {onForgotPassword && (
        <Button
          variant="link"
          onClick={onForgotPassword}
          className="text-sm mt-2"
        >
          Forgot password?
        </Button>
      )}
    </div>
  );
};
