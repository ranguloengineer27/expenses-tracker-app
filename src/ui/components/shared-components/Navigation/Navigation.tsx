import { Button } from "../../utility-components/Button";
import { useAuthStore } from "../../../stores/useAuthStore";

export const Navigation = () => {
  const { signOut } = useAuthStore();
  return (
    <ul className="w-30">
      <Button variant={"secondary"} onClick={signOut}>Logout</Button>
    </ul>
  );
};
