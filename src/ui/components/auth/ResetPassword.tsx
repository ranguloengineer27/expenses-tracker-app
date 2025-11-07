import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { InputPassword } from "../utility-components/InputPassword";
import { Button } from "../utility-components/Button";
import { isStrongPassword } from "./helpers/isStrongPassword";

export const ResetPassword = () => {
    const { updatePassword, session } = useAuthStore();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user has a valid session (Supabase sets this automatically when clicking reset link)
        if (!session) {
            setError("Invalid or expired reset link. Please request a new password reset.");
        }
    }, [session]);

    const handleResetPassword = async () => {
        setError(null);

        if (!session) {
            setError("Invalid or expired reset link. Please request a new password reset.");
            return;
        }

        if (!isStrongPassword(password)) {
            setError(
                "Password must be at least 8 chars and include upper, lower, number, and special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword(password);
            setSuccess(true);
            setTimeout(() => {
                navigate("/sign-in");
            }, 2000);
        } catch (err: any) {
            setError(err.message ?? "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 mx-auto flex flex-col items-center justify-center min-h-screen">
                <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
                    <h1>Password Reset Successful</h1>
                    <p className="text-green-600">
                        Your password has been successfully reset. Redirecting to sign in...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 mx-auto flex flex-col items-center justify-center min-h-screen">
                <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
                    <h1>Invalid Reset Link</h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button onClick={() => navigate("/sign-in")}>
                        Go to Sign In
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 mx-auto flex flex-col items-center justify-center min-h-screen">
            <div className="w-full mx-auto flex flex-col gap-2 min-h-[14rem]">
                <h1>Set New Password</h1>
                {error && <p className="text-red-500">{error}</p>}
                <InputPassword
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <InputPassword
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                />
                <Button onClick={handleResetPassword} disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
            </div>
        </div>
    );
};

