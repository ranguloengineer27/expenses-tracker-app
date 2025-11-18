"use client";

import { useState } from "react";
import { Input } from "../../utility-components/Input";
import { useProfileCreation } from "../../../hooks/useProfileCreation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import { useProfileStore } from "../../../stores/useProfileStore";

export const ProfileCreation = () => {
    const { user } = useAuthStore();
    const createProfile = useProfileCreation();
    const { profile } = useProfileStore();
    const [name, setName] = useState("");
    const router = useRouter();

    if (profile) {
        router.push("/projects");
        return;
    }

    return (
        <div>
            <p>Please write your name</p>
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-3 mb-3"
            />
            <Button
                onClick={() => {
                    createProfile.mutate({
                        id: user?.id,
                        name,
                        email: user?.email,
                    });
                    router.push("/projects");
                }}
            >
                Submit
            </Button>
        </div>
    );
};
