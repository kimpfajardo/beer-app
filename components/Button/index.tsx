import { cn } from "@/utils/functions";
import { VariantProps, cva } from "class-variance-authority";
import React, { forwardRef } from "react";

export const ButtonVariants = cva(" py-1.5 font-semibold text-sm", {
  variants: {
    variant: {
      primary:
        "bg-indigo-600 px-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
      secondary:
        "bg-white px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
      ghost:
        "bg-indigo-50 px-2 text-indigo-600 shadow-sm hover:bg-indigo-100",
    },
    roundness: {
      default: "rounded",
      square: "rounded-none",
      circular: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    roundness: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, roundness, className, ...rest }, ref) => {
    return (
      <button
        type="button"
        className={cn(ButtonVariants({ variant, roundness }), className)}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
