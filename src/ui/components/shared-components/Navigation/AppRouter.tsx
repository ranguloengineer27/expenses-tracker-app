import { Routes, Route, Navigate } from "react-router-dom";
import { ProfileCreation } from "../../profile/ProfileCreation/ProfileCreation";
import Projects from "../../project/Projects";
import { ProjectDashboard } from "../../project/ProjectDashboard/ProjectDashboard";
import { ExpenseLogsList } from "../../log/Logs";
import { SignIn } from "../../auth/SignIn";

export const ROUTES = Object.freeze({
    profile: "/add-profile",
    projects: "/projects",
    signIn: "/sign-in",
    projectDashboard: "/dashboard/:projectId",
    logs: "/logs",
});

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={ROUTES.projects} replace />} />
            <Route path={ROUTES.profile} element={<ProfileCreation />} />
            <Route path={ROUTES.projects} element={<Projects />} />
            <Route path={ROUTES.projectDashboard} element={<ProjectDashboard />} />
            <Route path={ROUTES.logs} element={<ExpenseLogsList />} />
            <Route path={ROUTES.signIn} element={<SignIn />} />
        </Routes>
    );
};

export default AppRouter;
