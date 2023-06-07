import { cn } from "@/utils/functions";
import { VariantProps, cva } from "class-variance-authority";
import React, { forwardRef } from "react";

export const InputVariants = cva("block w-full", {
  variants: {
    inputVariant: {
      primary:
        "rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 disabled:placeholder:text-gray-200 disabled:text-gray-300 disabled:focus:ring-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
      disabled:
        "rounded-md border-0 py-1.5 px-3 placeholder:text-gray-300 text-gray-200 sm:text-sm sm:leading-6",
    },
  },
  defaultVariants: {
    inputVariant: "primary",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, inputVariant, disabled, ...rest } = props;
  return (
    <>
      <label
        htmlFor={rest.name}
        className={cn(
          "block text-sm font-medium leading-6 text-gray-900",
          disabled && "text-gray-300"
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={rest.name}
          {...rest}
          ref={ref}
          className={cn(InputVariants({ inputVariant }), rest.className)}
        />
      </div>
    </>
  );
});

Input.displayName = "Input";
