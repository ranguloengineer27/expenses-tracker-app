import { Button } from "../utility-components/Button";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ForgotPassword } from "./ForgotPassword";
import { useState } from "react";

export const AuthUI = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    if (showForgotPassword) {
        return (
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 mx-auto flex flex-col items-center justify-center min-h-screen">
                <ForgotPassword />
                <Button
                    variant={`link`}
                    onClick={() => setShowForgotPassword(false)}
                >
                    Back to sign in
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 mx-auto flex flex-col items-center justify-center min-h-screen">
            {isSignIn ? <>
                <SignIn onForgotPassword={() => setShowForgotPassword(true)} />
                <Button
                    variant={`link`}
                    onClick={() => setIsSignIn(false)}
                >
                    Return to sign up page
                </Button>
            </> : <>
                <SignUp />
                <Button
                    variant={`link`}
                    onClick={() => setIsSignIn(true)}
                >
                    Do you have an account? Please sign in
                </Button>
            </>}
        </div>
    );
};

