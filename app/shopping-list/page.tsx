"use client";
import { Toast } from "@/components/Toast";
import { FilterMenu, ShopListCard, SortMenu } from "@/containers/ShoppingList";
import { ShoppingListBeerType, useShoppingList } from "@/context/ShoppingList";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "@/public/lotties/empty-cart.json";

export default function Page() {
  const {
    filter,
    sort,
    updateSort,
    updateFilter,
    beers,
    searchBeer,
    refreshBeerList,
  } = useShoppingList();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBeer(e.target.value as string);
  };
  const [tempBeer, setTempBeer] = useState<ShoppingListBeerType[]>(
    beers as ShoppingListBeerType[]
  );
  const supabase = createClientComponentClient();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const deleteBeer = async (beerId: number, listId: string) => {
    const newBeers = tempBeer.filter((beer) => beer.beer_id !== beerId);
    setTempBeer(newBeers);
    const { error } = await supabase
      .from("beers")
      .delete()
      .eq("beer_id", beerId)
      .eq("list_id", listId);

    if (error) {
      setTempBeer(beers as ShoppingListBeerType[]);
      toast.error("Error removing item");
      return;
    }
    toast.success("Item removed");
    refreshBeerList();
  };

  return (
    <>
      <Toast />
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
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <FilterMenu value={filter} onChange={updateFilter} />
          <SortMenu value={sort} onChange={updateSort} />
        </div>
        <div className="gap-4 flex flex-col-reverse">
          {beers.length === 0 && (
            <div className="space-y-4">
              <div className="relative">
                <Lottie
                  options={defaultOptions}
                  height={200}
                  width={200}
                  isClickToPauseDisabled
                />
              </div>
              <p className="text-center font-bold text-gray-400 select-none">
                Nothing to see here...
              </p>
            </div>
          )}
          {beers.map((item, index) => (
            <ShopListCard
              deleteBeer={deleteBeer}
              details={item}
              key={`${item.name}-${index}-shoplist`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
