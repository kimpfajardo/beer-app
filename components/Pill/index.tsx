import { cn } from "@/utils/functions";

export interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Pill = ({ children, className, ...rest }: PillProps) => {
  return (
    <div
      className={cn(
        "text-xs py-2 px-3 rounded-md cursor-pointer select-none w-max",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
