"use client";
import { FilterPills } from "../FilterPills";
import { useRouter } from "next/navigation";
import { useResolveBeerFilter } from "@/hooks/filters";
import { useCallback } from "react";
import { FILTER_LIST } from "@/utils/constants";

export const formatFilterToParams = (filter: string) => {
  return filter.replaceAll(" ", "_").toLowerCase();
};

export const Filters = () => {
  const router = useRouter();
  const filter = useResolveBeerFilter();

  const getActiveValue = (filterName: string) => {
    // return false
    return filter?.includes(formatFilterToParams(filterName));
  };

  const changeFilter = useCallback(
    (filterName: string) => {
      if (filterName === "All") {
        router.push(`/beer-gallery?filter=${formatFilterToParams(filterName)}`);
        return;
      }
      if (filter === "all") {
        router.push(`/beer-gallery?filter=${formatFilterToParams(filterName)}`);
      } else {
        const alreadyExists =
          filter?.includes(formatFilterToParams(filterName)) ?? false;
        if (alreadyExists) {
          const newFilter = filter
            ?.split(" ")
            .filter((item) => item !== formatFilterToParams(filterName));
          router.push(
            `/beer-gallery?filter=${formatFilterToParams(
              (newFilter?.[0] as string) ?? "all"
            )}`
          );
        } else {
          router.push(
            `/beer-gallery?filter=${`${filter}+${formatFilterToParams(
              filterName
            )}`}`
          );
        }
      }
    },
    [filter, router]
  );

  return (
    <div className="mx-auto w-max mb-4">
      {/* <h3 className='font-bold text-center mb-10'>Categories</h3> */}
      <div className="flex justify-center pt-6 ">
        <div className="flex items-center space-x-4">
          {FILTER_LIST.map((item, index) => (
            <FilterPills
              key={`filter-${item}-${index}`}
              isActive={getActiveValue(item)}
              onClick={() => changeFilter(item)}
              value={item}
            >
              {item}
            </FilterPills>
          ))}
        </div>
      </div>
    </div>
  );
};
