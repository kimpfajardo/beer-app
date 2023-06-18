"use client";
import { Toast } from "@/components/Toast";
import { FilterMenu, ShopListCard, SortMenu } from "@/containers/ShoppingList";
import { ShoppingListBeerType, useShoppingList } from "@/context/ShoppingList";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import animationData from "@/public/lotties/empty-cart.json";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/containers/ShoppingList/Navigation";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Filter } from "react-feather";
import { cn } from "@/utils/functions";

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

  const [mobileFilter, setMobileFilter] = useState(false);
  const toggleMobileFilter = () => {
    setMobileFilter((prev) => !prev);
  };

  return (
    <>
      <div className="sm:hidden">
        <Drawer
          open={mobileFilter}
          onClose={toggleMobileFilter}
          direction="right"
          className="p-4 "
          size={"80vw"}
        >
          <div>
            <div className="flex justify-end w-full mb-4">
              <button className="w-8 h-8" onClick={toggleMobileFilter}>
                <XCircleIcon />
              </button>
            </div>
            <div className="space-y-6">
              <FilterMenu
                className="flex flex-col space-x-0 space-y-4"
                value={filter}
                onChange={updateFilter}
              />
              <SortMenu value={sort} onChange={updateSort} />
            </div>
          </div>
        </Drawer>
      </div>
      <div
        className={cn(
          (beers.length > 0 && "",
          "sticky top-0 z-10 bg-gray-50 p-4 pb-0 sm:pb-4 mb-2")
        )}
      >
        <div className="flex justify-between items-center">
          <Logo />
          <Navigation />
        </div>
        <Toast />
        <div className="py-6 pb-2 sm:py-8 sm:pb-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold w-max">Shopping List</h2>
            <button className="sm:hidden" onClick={toggleMobileFilter}>
              <Filter className="text-indigo-600" />
            </button>
          </div>
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
          <div>
            <div className="hidden sm:flex justify-between">
              <FilterMenu
                value={filter}
                onChange={updateFilter}
                className="space-x-1"
              />
              <SortMenu value={sort} onChange={updateSort} />
            </div>
            <div className="h-auto space-y-2 w-full sm:hidden">
              <p className="text-sm font-bold">Filters</p>
              <div className="flex gap-4 w-full overflow-x-scroll relative hide-scrollbar">
                {filter.map((item) => {
                  return (
                    <div className="w-max text-gray-500" key={item}>
                      <div className="py-2 px-3 border border-gray-300 rounded-md text-sm w-max flex items-center space-x-4">
                        <div className="w-max">
                          <b>{item}</b> beers
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="py-2 px-3 text-gray-500 border border-gray-300 rounded-md text-sm w-max flex items-center space-x-4">
                  <div className="w-max">
                    <b>{sort}</b> order
                  </div>
                </div>
                <div className="h-full w-2 bg-gradient-to-l from-bg-green-500 to-transparent absolute right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-4 flex flex-col-reverse p-4">
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
            <p className="text-center font-semibold text-gray-400 select-none">
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
    </>
  );
}
