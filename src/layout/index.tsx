import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { navLinks } from "../utils";

export const Layout = () => {
  return (
    <>
      <header className="flex gap-3">
        <Navigation children={navLinks} position="right" show />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};
