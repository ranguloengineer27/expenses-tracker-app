import { Button } from "../../utility-components/Button";
import { useAuthStore } from "../../../stores/useAuthStore";

export const Navigation = () => {
  const { signOut } = useAuthStore();
  return (
    <ul className="w-30 justify-content-around">
      <Button onClick={signOut}>Logout</Button>
    </ul>
  );
};
