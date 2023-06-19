import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { DashboardLinks } from "../utils";

export const Dashboard = () => {
  const [name, setName] = useState("Seun Oyewole");
  return (
    <div>
      <h1>Dashboard</h1>
      <Navigation children={DashboardLinks} position="center" show={false} />
      <Outlet context={[name as string]} />
    </div>
  );
};
