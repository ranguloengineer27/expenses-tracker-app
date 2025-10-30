import { Routes, Route } from "react-router-dom";
import { ProfileCreation } from "../../profile/ProfileCreation/ProfileCreation";
import { Dashboard } from "../../_Dashboard/Dashboard";
import Projects from "../../project/Projects";
import { ProjectDashboard } from "../../project/ProjectDashboard/ProjectDashboard";
import { ExpenseLogsList } from "../../log/Logs";

export const ROUTES = Object.freeze({
    profile: "/add-profile",
    projects: "/projects",
    projectDashboard: "/dashboard/:projectId",
    logs: "/logs",
    dashboard: "/",
});

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.profile} element={<ProfileCreation />} />
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ROUTES.projects} element={<Projects />} />
            <Route path={ROUTES.projectDashboard} element={<ProjectDashboard />} />
            <Route path={ROUTES.logs} element={<ExpenseLogsList />} />
        </Routes>
    );
};

export default AppRouter;
