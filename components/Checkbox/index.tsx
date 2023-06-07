import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({
  label,
  ...rest
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        {...rest}
        id={rest.name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label
        htmlFor={rest.id}
        className="ml-3 block text-sm leading-6 text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};
