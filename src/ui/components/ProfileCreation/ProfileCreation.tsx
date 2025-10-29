import { useContext, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Input from "../Input";
import { useProfileCreation } from "../../hooks/useProfileCreation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../AppRouter";
import Button from "../Button";
import { ProfileContext } from "../../providers/ProfileContext";

export const ProfileCreation = () => {
    const { user } = useAuth();
    const { profile } = useContext(ProfileContext);

    const createProfile = useProfileCreation();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    if (profile) {
        navigate(ROUTES.dashboard);
        return;
    }

    return (
        <div>
            <p>Please write your name</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button
                onClick={() => {
                    createProfile.mutate({
                        id: user?.id,
                        name,
                        email: user?.email,
                    });
                    navigate(ROUTES.dashboard);
                }}
            >
                Submit
            </Button>
        </div>
    );
};
