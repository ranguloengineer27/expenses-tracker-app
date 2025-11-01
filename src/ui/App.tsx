import { Login } from "./components/auth/Login";
import AppRouter from "./components/shared-components/Navigation/AppRouter";
import { Navigation } from "./components/shared-components/Navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";

const MainContainer = () => {
  return (
    <div className="flex w-full">
      <div className="w-[15%] text-left">
        <Navigation />
      </div>
      <div className="w-[85%]">
        <AppRouter />
      </div>
    </div>
  );
};

function App() {
  const { user } = useAuthStore();

  return user ? (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  ) : (
    <Login />
  );
}

export default App;
