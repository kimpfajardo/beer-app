"use client";
import { Logo } from "@/components/Logo";
import { FilterMenu, ShopListCard, SortMenu } from "@/containers/ShoppingList";
import { Navigation } from "@/containers/ShoppingList/Navigation";
import { useShoppingList } from "@/context/ShoppingList";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Page() {
  const { filter, sort, updateSort, updateFilter, beers, searchBeer } =
    useShoppingList();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBeer(e.target.value as string);
  };
  return (
    <>
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
        <div className="space-y-4">
          {beers.map((item, index) => (
            <ShopListCard
              details={item}
              key={`${item.name}-${index}-shoplist`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
