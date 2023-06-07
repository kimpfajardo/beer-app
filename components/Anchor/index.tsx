import { cn } from "@/utils/functions";
import React from "react";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Anchor = ({ children, className, ...rest }: AnchorProps) => {
  return (
    <a
      className={cn(
        "font-semibold text-indigo-600 hover:text-indigo-500",
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
};
