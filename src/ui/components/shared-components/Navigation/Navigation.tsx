import { Link } from "react-router-dom";
import { ROUTES } from "./AppRouter";

export const Navigation = () => {
  return (
    <ul className="w-30 justify-content-around">
      <Link to={ROUTES.projects} className="block">
        Projects
      </Link>
      <Link to={ROUTES.dashboard} className="block mt-2">
        Dashboard
      </Link>
    </ul>
  );
};
