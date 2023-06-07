import { cn } from "@/utils/functions";
import React from "react";

export interface InputErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export const InputError = ({
  message = "",
  className,
  id,
}: InputErrorProps) => {
  if (!message) return <></>;
  return (
    <p className={cn("text-sm text-red-600", className)} id={id}>
      {message}
    </p>
  );
};
