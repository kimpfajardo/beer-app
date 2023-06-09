"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { BeerType } from "@/mockBeer";
import { FILTER_LIST, SORT_LIST } from "@/utils/constants";
import { cn } from "@/utils/functions";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, use, useCallback, useState } from "react";
import { FilterPills } from "../FilterPills";
import { BeerMugIcon, WaterIcon } from "@/components/Icons";
import { Tooltip } from "@/components/Tooltip";

export const ShopListCard = ({ details }: { details: BeerType }) => {
  const { name, image_url, abv, ph } = details;
  const [count, setCount] = useState(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) as number;
    if (value < 1) {
      setCount(1);
      return;
    }
    if (value > 99) {
      setCount(99);
      return;
    }
    setCount(value);
  };

  const handleIncrement = useCallback(() => {
    setCount((prev) => {
      if (prev >= 99) return prev;
      return prev + 1;
    });
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  }, []);

  return (
    <Card className="py-2">
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <Image src={image_url} width={48} height={48} alt={name} />
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-bold text-base sm:text-xl">{name}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 group relative">
                <BeerMugIcon className="text-xl text-amber-700" />
                <span>{abv ?? "N/A"}%</span>
                <Tooltip className="hidden group-hover:block group-hover:absolute left-1/4 top-full w-max">
                  ABV: Alcohol by volume
                </Tooltip>
              </div>{" "}
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-2 group relative">
                <WaterIcon className="text-xl text-indigo-700" />
                <span>{ph ?? "N/A"}%</span>
                <Tooltip className="hidden group-hover:block group-hover:absolute left-1/4 top-full w-max">
                  pH: Acidity
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center flex-col sm:flex-row space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 justify-between w-full sm:w-auto">
              <Button
                className="h-8 w-8 p-0 rounded-full flex justify-center items-center"
                onClick={handleIncrement}
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
              <input
                className="border border-gray-300 w-12 h-10 text-sm text-center text rounded-md"
                onChange={handleChange}
                type="number"
                step={0}
                value={count}
              />
              <Button
                className="h-8 w-8 p-0 rounded-full flex justify-center items-center"
                onClick={handleDecrement}
              >
                <MinusIcon className="w-5 h-5" />
              </Button>
            </div>
            <Button
              variant="secondary"
              className="h-8 w-full sm:w-8 p-0 sm:rounded-full flex justify-center items-center text-red-500 ring-red-400"
            >
              <TrashIcon className="w-5 h-5 hidden sm:block" />
              <span className="sm:hidden">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const SortMenu = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="h-auto space-y-2">
      <p className="text-sm font-bold">Sort</p>
      <Menu as="div" className="relative flex-shrink-0">
        <div>
          <Menu.Button className="flex items-center justify-between space-x-4 w-full py-2 px-3 pl-4 text-xs rounded-md ring-1 ring-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden ">
            <span className="min-w-max">{value}</span>
            <ChevronDownIcon className="text-gray-400 w-4" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-full sm:w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {SORT_LIST.map((item, index) => (
              <Menu.Item key={`sort-${item}-${index}`}>
                {({ active }) => (
                  <button
                    className={cn(
                      "w-full",
                      active ? "bg-gray-100" : "",
                      "text-left px-4 py-2 text-sm text-gray-700"
                    )}
                    onClick={() => onChange(item)}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export const FilterMenu = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold">Categories</p>
      <div className="gap-2 sm:gap-4 h-auto grid grid-cols-3 sm:grid-cols-[auto_auto_auto] sm:grid-cols-rows-1">
        {FILTER_LIST.map((item, index) => (
          <FilterPills
            key={`filter-${item}-${index}`}
            isActive={value.includes(item)}
            onClick={() => onChange(item)}
            value={item}
            className="w-full sm:w-max border sm:g sm:border-0"
          >
            {item}
          </FilterPills>
        ))}
      </div>
    </div>
  );
};
