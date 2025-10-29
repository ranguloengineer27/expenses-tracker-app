import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";
import Dialog from "../components/Dialog";

const ConfirmEmailDialog = () => {
  return (
    <Dialog>
      <Dialog.Content>Please check your email</Dialog.Content>
    </Dialog>
  );
};

export const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    await signIn(email);
    setShowModal(true);
  };

  return (
    <div className="w-50 flex flex-column">
      {showModal && <ConfirmEmailDialog />}
      <h1>Please enter your email to sign in</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleLogin}>Sign In</Button>
    </div>
  );
};
