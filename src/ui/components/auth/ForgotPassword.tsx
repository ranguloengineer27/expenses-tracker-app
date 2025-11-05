import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Input } from "../utility-components/Input";
import { Button } from "../utility-components/Button";

export const ForgotPassword = () => {
    const { resetPasswordForEmail } = useAuthStore();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await resetPasswordForEmail(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message ?? "Failed to send password reset email");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
                <h1>Check Your Email</h1>
                <p className="text-green-600">
                    We've sent a password reset link to {email}. Please check your inbox and follow the instructions.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
            <h1>Reset Password</h1>
            <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
            {error && <p className="text-red-500">{error}</p>}
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <Button onClick={handleResetPassword} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
        </div>
    );
};

