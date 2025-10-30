import { useContext } from "react";
import { ProfileContext } from "../../providers/ProfileContext";
import { ROUTES } from "../shared-components/Navigation/AppRouter";
import { useNavigate } from "react-router-dom";
import CSS from "./Dashboard.module.scss";
import { useAuthStore } from "../../stores/useAuthStore";

export const Dashboard = () => {
    const { signOut } = useAuthStore();
    const { profile } = useContext(ProfileContext);

    const navigate = useNavigate();

    if (!profile) {
        navigate(ROUTES.profile);
        return;
    }

    return (
        <div className="w-100">
            <p>Welcome, {profile?.name}</p>
            <div className={CSS.Dashboard}>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    );
};
