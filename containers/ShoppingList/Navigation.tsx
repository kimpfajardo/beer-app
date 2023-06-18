"use client";
import { AvatarIcon } from "@/components/Icons";
import { cn } from "@/utils/functions";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useMemo } from "react";

const navigationList = [
  { name: "My Profile", href: "/profile" },
  { name: "View my shopping list", href: "/shopping-list" },
  { name: "View beer gallery", href: "/beer-gallery" },
];

export const Navigation = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathName = usePathname();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/");
    }
  };

  const navigation = useMemo(() => {
    return pathName === "/shopping-list"
      ? navigationList.filter((item) => item.href !== "/shopping-list")
      : navigationList;
  }, [pathName]);

  return (
    <Menu as="div" className="relative ml-5 flex-shrink-0">
      <div>
        <Menu.Button className="flex items-center justify-center rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden w-8 h-8">
          <span className="sr-only">Open user menu</span>
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md select-none bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={cn(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            <a
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={signOut}
            >
              Sign out...
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
