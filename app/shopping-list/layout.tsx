import { Logo } from "@/components/Logo";
import { Navigation } from "@/containers/ShoppingList/Navigation";
import {
  ShoppingListBeerType,
  ShoppingListProvider,
} from "@/context/ShoppingList";
import { inter } from "@/utils/fonts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { BeerType } from "@/mockBeer";
import { createShoppingList } from "@/utils/functions";
import { redirect } from "next/navigation";

const getBeerList = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const shoppingListByUser = await supabase
    .from("shopping-list")
    .select("list_id")
    .eq("user_id", session?.user.id);
  if (shoppingListByUser.error) {
    return [];
  }

  if (!shoppingListByUser.data.length) {
    await createShoppingList(session?.user.id as string, supabase);
    redirect("/shopping-list");
    return [];
  }
  const shoppingListId = shoppingListByUser?.data[0].list_id;
  const { data: shoppingListItems, error } = await supabase
    .from("beers")
    .select("*")
    .eq("list_id", shoppingListId);
  if (error) {
    return [];
  }
  return shoppingListItems;
};

const getBeerDataById = async (
  beerList: {
    [x: string]: any;
  }[]
) => {
  const beerIdList = beerList.map((beer) => beer.beer_id);
  const combinedBeerIdList = beerIdList.join("|");
  const res = await fetch(
    `https://api.punkapi.com/v2/beers?ids=${combinedBeerIdList}`
  );
  if (!res.ok) {
    return [];
  }
  const beerData = (await res.json()) as BeerType[];

  const combineBeerDataById = beerData.map((beer) => {
    const matchingBeerData = beerList.find((item) => {
      return parseInt(item.beer_id) === beer.id;
    });
    return {
      ...beer,
      ...matchingBeerData,
    };
  });

  return combineBeerDataById.sort(
    (a: ShoppingListBeerType, b: ShoppingListBeerType) =>
      b.created_at - a.created_at
  );
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawBeerDataList = await getBeerList();
  const beerList = await getBeerDataById(rawBeerDataList);

  return (
    <div className={inter.className}>
      <ShoppingListProvider beerList={beerList}>
        <div className="bg-slate-50 min-h-screen p-0 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl h-full">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-full">
              <div className="h-full">{children}</div>
            </div>
          </div>
        </div>
      </ShoppingListProvider>
    </div>
  );
}
