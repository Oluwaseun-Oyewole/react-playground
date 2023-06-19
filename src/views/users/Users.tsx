import { useNavigate, useOutletContext } from "react-router";
import { Button } from "../../components/atom/button";

export const Users = () => {
  const navigate = useNavigate();
  const [...name] = useOutletContext<string>();
  return (
    <div>
      Users is {name}
      <div className="w-1/2">
        <Button onClick={() => navigate("../")} children="Go Back One" />
      </div>
    </div>
  );
};
