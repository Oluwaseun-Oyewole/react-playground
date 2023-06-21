import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { DashboardLinks } from "../utils";

export const Dashboard = () => {
  return (
    <div>
      <Navigation children={DashboardLinks} position="left" show={false} />
      <Outlet />
    </div>
  );
};
