import "./_globals.scss";
import { Login } from "./components/auth/Login";
import AppRouter from "./components/shared-components/Navigation/AppRouter";
import { Navigation } from "./components/shared-components/Navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";

function App() {
  const { user } = useAuthStore();

  return user ? (
    <>
      <BrowserRouter>
        <Navigation />
        <AppRouter />
      </BrowserRouter>
    </>
  ) : (
    <Login />
  );
}

export default App;
