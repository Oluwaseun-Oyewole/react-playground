import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FormErrorMessgae } from "./error-mesage";
import { Input } from "./input";

export interface NumberProp {
  onChange: (val: number) => void;
  [key: string]: any;
}

export const NumberInput = ({
  onChange,
  errors,
  name,
  ...rest
}: NumberProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : 0;
    onChange(value);
  };

  return (
    <>
      <Input
        type="number"
        size="medium"
        className={classNames(
          "w-full text-gray-100 bg-gray-700 block px-5 outline-none transition-colors ease-in-out focus:border-blue-700"
        )}
        onChange={handleChange}
        {...rest}
      />
      <ErrorMessage
        name={name as any}
        errors={errors}
        render={({ message }) => (
          <FormErrorMessgae className="mt-1">{message}</FormErrorMessgae>
        )}
      />
    </>
  );
};
