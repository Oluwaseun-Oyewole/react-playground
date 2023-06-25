import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useLoginContextProvider } from "../hooks/use-login-context";
import { DashboardLinks } from "../utils";

export const Dashboard = () => {
  const { user } = useLoginContextProvider();

  return (
    <div>
      <Navigation children={DashboardLinks} position="left" show={false} />
      <div className="my-2 flex flex-col justify-center h-[50vh] text-lg text-blue-400">
        <p className="underline">Current user info: </p>
        <p>Email : {user?.email} </p>
        <p>Phone Number : {user?.phoneNumber | 0} </p>
        <p>Signed up time : {user?.metadata?.creationTime} </p>
        <p>Last login time was : {user?.metadata?.lastSignInTime} </p>
      </div>
      <Outlet />
    </div>
  );
};
