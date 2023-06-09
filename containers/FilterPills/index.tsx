import { Pill } from "@/components/Pill";
import { cn } from "@/utils/functions";

export interface CategoryPillProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean;
  value: string;
}

export enum Filter {
  ALL = "All",
  HIGH_ABV = "High Alcohol",
  HIGH_ACIDITY = "High Acidity",
}

export const FilterPills = ({
  value,
  isActive,
  ...rest
}: CategoryPillProps) => {
  const filterColors = {
    [Filter.ALL]: {
      color: "bg-gray-200",
      hoverColor: "hover:bg-gray-100",
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
        'transition-[background]',
        isActive && "font-bold",
        isActive && filterColors[value as Filter].color,
        filterColors[value as Filter].hoverColor
      )}
      {...rest}
    >
      {value}
    </Pill>
  );
};
