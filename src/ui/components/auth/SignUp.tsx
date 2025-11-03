import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Input } from "../utility-components/Input";
import { Button } from "../utility-components/Button";
import { SignUpConfirmationModal } from "./SignUpConfirmationModal";
import { isStrongPassword } from "./helpers/isStrongPassword";

export const SignUp = () => {
    const { signUp } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleSignUp = async (e: any) => {
        e?.preventDefault?.();
        setError(null);

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

        try {
            await signUp(email, password);
            setShowConfirmationModal(true);
        } catch (err: any) {
            setError(err.message ?? "Sign up failed");
        }
    };

    return (
        <>
            <SignUpConfirmationModal open={showConfirmationModal} />
            <div className="w-full mx-auto flex flex-col gap-2">
                <h1>Sign Up</h1>
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
                <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={handleSignUp}>Sign Up</Button>
            </div>
        </>
    );
};
