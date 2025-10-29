import "./_globals.scss";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./containers/Login";
import AppRouter from "./AppRouter";
import { Navigation } from "./components/Navigation/Navigation";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { user } = useAuth();

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
