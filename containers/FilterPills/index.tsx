import { Pill } from "@/components/Pill";
import { Filter } from "@/utils/constants";
import { cn } from "@/utils/functions";

export interface CategoryPillProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean;
  value: string;
}

export const FilterPills = ({
  value,
  isActive,
  className,
  ...rest
}: CategoryPillProps) => {
  const filterColors = {
    [Filter.ALL]: {
      color: "bg-gray-400 text-white",
      hoverColor: "hover:bg-gray-300 hover:text-white",
    },
    [Filter.HIGH_ABV]: {
      color: "bg-amber-600 text-white",
      hoverColor: "hover:bg-amber-500 hover:text-white",
    },
    [Filter.HIGH_ACIDITY]: {
      color: "bg-indigo-600 text-white",
      hoverColor: "hover:bg-indigo-500 hover:text-white",
    },
  };
  return (
    <Pill
      className={cn(
        "transition-all",
        isActive && filterColors[value as Filter].color,
        filterColors[value as Filter].hoverColor,
        className
      )}
      {...rest}
    >
      {value}
    </Pill>
  );
};

export const SortPills = ({ value, isActive, ...rest }: CategoryPillProps) => {
  return (
    <Pill
      className={cn(
        "transition-[background] text-amber-700",
        isActive && "bg-amber-700",
        "hover:bg-amber-100"
      )}
      {...rest}
    >
      {value}
    </Pill>
  );
};
