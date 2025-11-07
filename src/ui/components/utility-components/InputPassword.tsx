import { useState } from "react";
import { Input } from "./Input";
import Eye from "../../assets/icons/Eye";
import EyeOff from "../../assets/icons/EyeOff";

type InputPasswordProps = Omit<React.ComponentProps<"input">, "type"> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputPassword = ({ className, ...props }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className || ""}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        disabled={props.disabled}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

