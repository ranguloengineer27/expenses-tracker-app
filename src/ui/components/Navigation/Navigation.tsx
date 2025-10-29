import { Link } from "react-router-dom";
import { ROUTES } from "../../AppRouter";

export const Navigation = () => {
  return (
    <ul className="w-30 flex justify-content-around margin-inline-auto">
      <Link to={ROUTES.projects}>Projects</Link>
      <Link to={ROUTES.dashboard}>Dashboard</Link>
    </ul>
  );
};
