import { animated, config, useSpring } from "@react-spring/web";
import classNames from "classnames";
import { ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import { useFetchContextProvider } from "../../../context/fetch-context";
import { Backdrop } from "./Backdrop";

type ModalType = "postAction" | "dialog" | "dropdown" | "form";
type ModalPropsType = {
  show?: boolean;
  close: () => void;
  type?: ModalType;
  children?: ReactElement | string;
  error?: string;
};
export const Modal = ({
  show,
  close,
  type = "dialog",
  children,
  error,
  ...props
}: ModalPropsType) => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: show ? "translateY(-2000px)" : "translateY(0)",
    },
    to: {
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(-1200px)",
    },
    config: config.default,
    delay: show ? 50 : 0,
  });

  const { states } = useFetchContextProvider();

  switch (type) {
    case "dialog":
      return (
        <>
          <Backdrop show={show} close={close} />
          <animated.div
            style={animationProps}
            className={classNames(
              "absolute left-0 w-full overflow-hidden flex justify-center items-center z-20 top-0 pr-[40px] w-[100%] h-screen  overflow-y-scroll"
            )}
            onClick={close}
          >
            <div
              className={classNames(
                "bg-gray-900 w-[70%] lg:w-[40%] rounded-[2px] h-auto mx-auto md:m-auto p-10 pt-7 pr-6"
              )}
              {...props}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </animated.div>
        </>
      );

    case "postAction":
      return (
        <>
          <Backdrop show={show} close={close} />
          <animated.div
            style={animationProps}
            className="absolute left-0 w-full h-full overflow-hidden flex justify-center top-0 z-20 py-2"
            onClick={close}
          >
            <div
              {...props}
              onClick={(e) => e.stopPropagation()}
              className={`h-8 w-2/5 relative flex justify-center items-center px-4 text-center text-gray-300 z-30 text-lg font-medium ${
                states.error ? "bg-red-500" : "bg-green-800"
              }`}
            >
              {children}
              <FaTimes
                onClick={close}
                size="15"
                className="cursor-pointer right-4 absolute"
              />
            </div>
          </animated.div>
        </>
      );

    case "form":
      return (
        <>
          <Backdrop show={show} close={close} />
          <animated.div
            style={animationProps}
            className={classNames(
              "absolute left-0 w-full overflow-hidden flex justify-center items-center z-20 top-0 pr-[40px] w-[100%] h-screen  overflow-y-scroll"
            )}
            onClick={close}
          >
            <div
              className={classNames(
                "bg-black w-[70%] lg:w-[40%] rounded-[2px] h-auto mx-auto md:m-auto p-10 pt-7 pr-6"
              )}
              {...props}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </animated.div>
        </>
      );
    default:
      return (
        <>
          <Backdrop show={show} close={close} />
          <div className="relative">
            <div>{children}</div>
          </div>
        </>
      );
  }
};
