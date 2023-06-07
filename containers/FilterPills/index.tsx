import { Pill } from "@/components/Pill";
import { cn } from "@/utils/functions";

export interface CategoryPillProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean;
}

export const FilterPills = ({ children, isActive }: CategoryPillProps) => {
  return (
    <Pill className={cn("hover:bg-gray-100", isActive && "bg-gray-100")}>
      {children}s
    </Pill>
  );
};
