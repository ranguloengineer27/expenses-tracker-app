import { useState } from "react";
import { Dialog, DialogContent } from "../utility-components/Dialog";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../utility-components/Button";
import { Input } from "../utility-components/Input";

const ConfirmEmailDialog = () => {
  return (
    <Dialog>
      <DialogContent>Please check your email</DialogContent>
    </Dialog>
  );
};

export const Login = () => {
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    await signIn(email);
    setShowModal(true);
  };

  return (
    <div className="w-1/2 mx-auto">
      {showModal && <ConfirmEmailDialog />}
      <h1>Please enter your email to sign in</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-3 mb-3"
      />
      <Button onClick={handleLogin}>Sign In</Button>
    </div>
  );
};
