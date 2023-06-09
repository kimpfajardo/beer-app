"use client";
import { Logo } from "@/components/Logo";
import { useBeerList } from "@/context/BeersContext";
import { useDebounce } from "@/hooks/debounce";
import { cn } from "@/utils/functions";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "My Profile", href: "/profile" },
  { name: "Sign out...", href: "/sign-out" },
];

export const Navigation = () => {
  const { updateBeerList } = useBeerList();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState<string>("");
  const debouncedSearchItem = useDebounce(searchItem, 500);

  const goToShoppingList = () => router.push("/shopping-list");

  useEffect(() => {
    updateBeerList(debouncedSearchItem);
  }, [debouncedSearchItem, updateBeerList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  return (
    <Popover
      as="header"
      className={({ open }) =>
        cn(
          open ? "fixed inset-0 z-40 overflow-y-auto" : "",
          "bg-white shadow-sm lg:static lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
              <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-lg lg:mx-0 lg:max-w-none xl:px-0">
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
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-2">
                <button
                  className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={goToShoppingList}
                >
                  <span className="sr-only">View notifications</span>
                  <ShoppingBagIcon
                    className="h-6 w-6 text-black"
                    aria-hidden="true"
                  />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-5 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                        width={32}
                        height={32}
                      />
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
            </div>
          </div>

          <Popover.Panel
            as="nav"
            className="lg:hidden h-screen bg-white"
            aria-label="Global"
          >
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 space-x-2">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-bold text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={goToShoppingList}
                >
                  <span className="sr-only">View notifications</span>
                  <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                      item.name === "Sign out..." && "text-red-600"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
