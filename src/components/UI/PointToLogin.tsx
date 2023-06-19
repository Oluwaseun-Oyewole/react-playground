import classNames from "classnames";
import { Link } from "react-router-dom";

type ChildrenType = {
  message: string;
  path: string;
  children: string;
};
export const PointToLogin = ({ children, path, message }: ChildrenType) => {
  const pointToLogin = (
    <>
      <div>
        <p className={classNames("text-right text-green-500")}>
          {message}
          <Link to={`${path}`} className={classNames("text-blue-500 mx-2")}>
            {children}
          </Link>
        </p>
      </div>
    </>
  );

  return pointToLogin;
};
