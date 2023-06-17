import classNames from "classnames";
import React, { JSX } from "react";

interface FieldSetType {
  label?: string | undefined;
  children?: React.ReactElement;
}

export const FieldSet = ({ label, children }: FieldSetType): JSX.Element => {
  return (
    <fieldset className={classNames("my-4")}>
      {label && <legend className="text-2xl my-5">{label}</legend>}
      <div>{children}</div>
    </fieldset>
  );
};
