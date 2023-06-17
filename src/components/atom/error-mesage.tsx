import classNames from "classnames";

type ErrorMessagepropType = {
  children?: string;
  className?: string;
};
export const FormErrorMessgae = ({
  children,
  className,
}: ErrorMessagepropType) => {
  return (
    <div className={classNames("text-gray-100 text-sm", className)}>
      {children}
    </div>
  );
};
