import classNames from "classnames";
import { ReactElement } from "react";

interface FormFieldType {
  id: string;
  label?: string;
  children?: ReactElement;
}

export const FormField = ({ id, label, children }: FormFieldType) => {
  return (
    <>
      {children}
      <label htmlFor={id} className={classNames("text-green-500 py-1 block")}>
        {label}
      </label>
    </>
  );
};
