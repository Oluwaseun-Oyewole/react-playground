import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Logout } from "../UI/Logout";

type NavigationPosition = "left" | "right" | "center";

export type ChildrenTypes = {
  children: Array<{ [key in string]: string }>;
  position: NavigationPosition;
  show: boolean;
};

const positionMap: { [key in NavigationPosition]: string } = {
  left: "items-end justify-start",
  right: "items-end justify-end",
  center: "item-center justify-center",
};

export const Navigation = ({ children, position, show }: ChildrenTypes) => {
  return (
    <div className={classNames("flex justify-between w-full py-3")}>
      {show && <Logout />}
      <nav className="w-full">
        <ul className={classNames("flex gap-2 w-full", positionMap[position])}>
          {children?.map(({ pathname, title }, index) => {
            return (
              <li
                key={index}
                className={classNames("list-none text-xl font-medium")}
              >
                <NavLink
                  to={{ pathname }}
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
