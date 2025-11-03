import { Button } from "../utility-components/Button";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { useState } from "react";

export const AuthUI = () => {
    const [isSignIn, setIsSignIn] = useState(false);

    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 mx-auto flex flex-col items-center justify-center min-h-screen">
            {isSignIn ? <>
                <SignIn />
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

