import classNames from "classnames";
import React from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  className?: string;
}

export const Button = ({ children, type, className, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      {...rest}
      className={classNames(
        "transform duration-200 py-3 px-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-500 focus:outline-none disabled:opacity-50 w-full lg:w-full transition-all ease-in-out duration-500",
        className
      )}
    >
      {children}
    </button>
  );
};
