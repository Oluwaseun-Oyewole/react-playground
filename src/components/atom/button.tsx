import classNames from "classnames";
import React, { useState } from "react";
import ReactiveButton from "reactive-button";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  type,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  const [state, setState] = useState("idle");

  const onClickHandler = () => {
    setState("loading");

    // send an HTTP request
    setTimeout(() => {
      setState("success");
    }, 2000);
  };

  return (
    <>
      <button
        type={type}
        {...rest}
        className={classNames(
          "py-3 px-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-500 focus:outline-none disabled:opacity-50 w-full lg:w-full transition-all ease-in-out duration-700",
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>

      {/* <ReactiveButton
        type={type}
        buttonState={state}
        idleText="Submit"
        loadingText="Loading"
        successText="Done"
        onClick={onClickHandler}
        block={true}
        color="blue"
      /> */}
    </>
  );
};
