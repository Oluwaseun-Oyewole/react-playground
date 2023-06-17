import classNames from "classnames";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export type FormTextAreaType = {
  id: string;
  name: string;
  label?: string;
  row?: number;
  className?: string;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
export const FormTextArea = ({
  id,
  name,
  label,
  row,
  className,
  ...props
}: FormTextAreaType) => {
  return (
    <textarea
      id={id}
      name={name}
      aria-label={label}
      rows={row}
      className={classNames(
        "block w-full appearance-none relative inline-flex p-3 text-base rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30 overflow-auto resize-none",
        className
      )}
      {...props}
    />
  );
};
