import { lobster } from "@/utils/fonts";
import { cn } from "@/utils/functions";
import Link from "next/link";
import { HTMLAttributes } from "react";

export interface LogoProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "sm" }: LogoProps) => {
  const sizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };
  return (
    <Link href="/">
      <h1
        className={cn(
          lobster.className,
          className,
          sizes[size as keyof typeof sizes],
          "text-indigo-600"
        )}
      >
        <span className="text-amber-600">Ale</span>manac
      </h1>
    </Link>
  );
};
