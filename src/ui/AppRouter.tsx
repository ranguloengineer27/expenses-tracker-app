import { Routes, Route } from "react-router-dom";
import { ProfileCreation } from "./components/ProfileCreation/ProfileCreation";
import { Dashboard } from "./components/Dashboard/Dashboard";
import Projects from "./components/Projects/Projects";
import { ProjectDashboard } from "./components/ProjectDashboard/ProjectDashboard";

export const ROUTES = Object.freeze({
    profile: '/add-profile',
    projects: '/projects',
    projectDashboard: '/dashboard/:projectId',
    dashboard: '/',
})

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.profile} element={<ProfileCreation />} />
            <Route path={ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ROUTES.projects} element={<Projects />} />
            <Route path={ROUTES.projectDashboard} element={<ProjectDashboard />} />
        </Routes>
    )
}

export default AppRouter;