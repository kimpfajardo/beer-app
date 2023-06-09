"use client";
import { AvatarIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { FilterPills, SortPills } from "@/containers/FilterPills";
import { ShopListCard } from "@/containers/ShoppingList";
import { mockBeer } from "@/mockBeer";
import { FILTER_LIST, SORT_LIST } from "@/utils/constants";
import { cn } from "@/utils/functions";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment, useState } from "react";

const userNavigation = [
  { name: "My Profile", href: "/profile" },
  { name: "View beer gallery", href: "/beer-gallery" },
  { name: "Sign out...", href: "/sign-out" },
];

export default function Page() {
  const [sort, setSort] = useState(SORT_LIST[0]);
  const [filter, setFilter] = useState(FILTER_LIST[0]);
  return (
    <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <Logo />
        <Menu as="div" className="relative ml-5 flex-shrink-0">
          <div>
            <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden w-8 h-8">
              <span className="sr-only">Open user menu</span>
              <AvatarIcon />
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={cn(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                        item.name === "Sign out..." && "text-red-600"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="py-10 space-y-6">
        <h2 className="text-2xl font-bold">Shopping List</h2>
        <div className="flex items-center md:mx-auto lg:mx-0 lg:max-w-none xl:px-0">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-xl border-none bg-white py-1.5 pl-10 pr-3 text-gray-900  ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            {FILTER_LIST.map((item, index) => (
              <FilterPills
                key={`filter-${item}-${index}`}
                isActive={filter === item}
                onClick={() => setFilter(item)}
                value={item}
              >
                {item}
              </FilterPills>
            ))}
          </div>
          <div>
            <Menu as="div" className="relative ml-5 flex-shrink-0">
              <div>
                <Menu.Button className="flex items-center space-x-4 py-2 px-3 pl-4 text-xs rounded-md ring-1 ring-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden ">
                  <span className="min-w-max">{sort}</span>
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {SORT_LIST.map((item, index) => (
                    <Menu.Item key={`sort-${item}-${index}`}>
                      {({ active }) => (
                        <button
                          className={cn(
                            "w-full",
                            active ? "bg-gray-100" : "",
                            "text-left px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={() => setSort(item)}
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
        </div>
        <div className="space-y-4">
          {[mockBeer].map((item, index) => {
            return (
              <ShopListCard details={item} key={`${name}-${index}-shoplist`} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
