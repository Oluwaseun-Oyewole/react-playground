import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useLoginContextProvider } from "../hooks/use-login-context";
import { navLinks } from "../utils";

export const Layout = () => {
  const { state } = useLoginContextProvider();
  return (
    <>
      {state.token && (
        <header className="flex gap-3">
          <Navigation children={navLinks} position="right" show />
        </header>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
};