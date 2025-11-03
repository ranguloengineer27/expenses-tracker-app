import { AuthUI } from "./components/auth/AuthUI";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { isUserAuthenticated } from "./helpers/isUserAuthenticated";
import { MainContainer } from "./components/MainContainer";

function App() {
  const { user } = useAuthStore();
  const canUserSeeUI = isUserAuthenticated(user);

  return canUserSeeUI ? (
    <>
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </>
  ) : (
    <AuthUI />
  );
}

export default App;
