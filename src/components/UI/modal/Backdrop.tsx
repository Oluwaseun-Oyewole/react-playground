import classNames from "classnames";

type BackdropPropsType = {
  show?: boolean;
  close?: () => void;
};

export const Backdrop = ({ show, close }: BackdropPropsType) => {
  return (
    <>
      {show && (
        <div
          onClick={close}
          className={classNames(
            "fixed min-h-screen w-full bg-gray-900 opacity-70 z-10 left-0 top-0"
          )}
        ></div>
      )}
    </>
  );
};
