import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "./shared-components/Navigation/Navigation";
import AppRouter, { ROUTES } from "./shared-components/Navigation/AppRouter";
import { useProfileStore } from "../stores/useProfileStore";

export const MainContainer = () => {
  const { profile } = useProfileStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile && location.pathname !== ROUTES.profile) {
      navigate(ROUTES.profile, { replace: true });
    }
  }, [profile, location.pathname, navigate]);

  return (
    <div className="flex w-full">
      {/* <div className="w-[15%] flex justify-center items-end">
        <Navigation />
      </div> */}
      <div className="w-full sm:w-[85%] lg:w-[70%] md:mx-auto">
        <AppRouter />
        <Navigation />
      </div>
    </div>
  );
};


