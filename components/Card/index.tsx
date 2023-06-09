import { cn } from "@/utils/functions";
import { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          className,
          "border-0 overflow-hidden relative rounded-xl bg-white p-6 transition-[box-shadow] duration-300 ring-1 ring-gray-300"
        )}
        {...rest}
        ref={ref}
      />
    );
  }
);

Card.displayName = "Card";
