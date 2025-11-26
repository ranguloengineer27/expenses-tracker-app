"use client";

import { useEffect, useState } from "react";
import { Input } from "../../utility-components/Input";
import { useProfileCreation } from "../../../hooks/profile/useProfileCreation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/Button";
import { useProfileStore } from "../../../stores/useProfileStore";
import { fetchProfileByName } from "@/api/adapters/profile";
import { useDebounce } from "@/ui/hooks/shared/useDebounce";
import { withErrorMessage } from "@/ui/HOC/withErrorMessage";
import { InputQueryProfiles } from "../InputQueryProfiles";

const ERROR_USER_EXISTS = "That username already exists";

export const ProfileCreation = () => {
    const { user } = useAuthStore();
    const createProfile = useProfileCreation();
    const { profile } = useProfileStore();
    const router = useRouter();
    const [name, setName] = useState("");
   const [nameExists, setNameExists] = useState(false);
    
    useEffect(() => {
        if (profile) {
            router.push("/projects");
        }
    }, [profile, router]);

    if (profile) return null;

    return (
        <div>
            <p>Please write your name</p>
            <InputQueryProfiles
                name={name}
                setName={setName}
                setNameExists={setNameExists}
                nameExists={nameExists}
                error={nameExists ? ERROR_USER_EXISTS : null}
            />
            <Button
                className="mt-2"
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
