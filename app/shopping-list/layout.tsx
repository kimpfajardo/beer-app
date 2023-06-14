import { LayoutProps } from "@/.next/types/app/layout";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/containers/ShoppingList/Navigation";
import { ShoppingListProvider } from "@/context/ShoppingList";
import { inter } from "@/utils/fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";

export const getBeerList = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const shoppingListByUser = await supabase
    .from("shopping-list")
    .select("list_id")
    .eq("user_id", session?.user.id);
  // const data = await getShoppingListItems()
  if (!shoppingListByUser.error) {
    const shoppingListId = shoppingListByUser?.data[0].list_id;
    const { data: shoppingListItems, error } = await supabase
      .from("beers")
      .select("*")
      .eq("list_id", shoppingListId);
    if (!error) {
      return shoppingListItems;
    }
    return [];
  }
  return [];
};

export default async function Layout({ children }: LayoutProps) {
  const beerList = await getBeerList();
  return (
    <div className={inter.className}>
      <ShoppingListProvider beerList={beerList}>
        <div className="bg-slate-50 min-h-screen p-0 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl h-full">
            <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <Logo />
                <Navigation />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </ShoppingListProvider>
    </div>
  );
}
