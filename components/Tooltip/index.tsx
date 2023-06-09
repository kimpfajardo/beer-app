import { cn } from "@/utils/functions";
import { HTMLAttributes } from "react";

export const Tooltip = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "p-1 px-2 border border-gray-400 bg-slate-900 text-white rounded-md text-sm",
        className
      )}
      {...rest}
    />
  );
};
