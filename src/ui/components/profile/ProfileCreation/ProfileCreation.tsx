import { useState } from "react";
import { Input } from "../../utility-components/input";
import { useProfileCreation } from "../../../hooks/useProfileCreation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../shared-components/Navigation/AppRouter";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../utility-components/button";
import { useProfileStore } from "../../../stores/useProfileStore";

export const ProfileCreation = () => {
  const { user } = useAuthStore();
  const createProfile = useProfileCreation();
  const { profile } = useProfileStore();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  if (profile) {
    navigate(ROUTES.projects);
    return;
  }

  return (
    <div>
      <p>Please write your name</p>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-3 mb-3"
      />
      <Button
        onClick={() => {
          createProfile.mutate({
            id: user?.id,
            name,
            email: user?.email,
          });
          navigate(ROUTES.projects);
        }}
      >
        Submit
      </Button>
    </div>
  );
};
