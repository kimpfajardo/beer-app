import React, { forwardRef } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...rest }: CheckboxProps, ref) => {
    return (
      <div className="flex items-center">
        <input
          {...rest}
          ref={ref}
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
  }
);

Checkbox.displayName = "Checkbox";
