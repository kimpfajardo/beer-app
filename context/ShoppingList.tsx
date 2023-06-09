"use client";
import { BeerType, mockBeer } from "@/mockBeer";
import { FILTER_LIST, SORT_LIST } from "@/utils/constants";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { set } from "zod";

export interface ShoppingListContext {
  sort: string;
  updateSort: (sort: string) => void;
  filter: string[];
  updateFilter: (filter: string) => void;
  searchBeer: (search: string) => void;
  beers: BeerType[];
}

export const ShoppingListContext = createContext<ShoppingListContext>(
  {} as ShoppingListContext
);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState<string>(SORT_LIST[0] as string);
  const [filter, setFilter] = useState<string[]>([FILTER_LIST[0]] as string[]);

  const updateSort = (sort: string) => {
    setSort(sort);
  };

  const updateFilter = (filterValue: string) => {
    const isAll = filterValue === FILTER_LIST[0];
    if (isAll) {
      setFilter([filterValue]);
      return;
    }
    const alreadyExists = filter.includes(filterValue);
    if (alreadyExists) {
      const removedExisting = filter.filter((item) => item !== filterValue);
      if (removedExisting.length === 0) {
        setFilter([FILTER_LIST[0]]);
        return;
      }
      setFilter(removedExisting);
      return;
    }
    setFilter(
      [...filter, filterValue].filter((item) => item !== FILTER_LIST[0])
    );
  };

  const [mainBeerList, setMainBeerList] = useState<BeerType[]>([
    mockBeer,
  ] as BeerType[]);
  const [searchTerm, setSearchTerm] = useState<string>("" as string);
  const [beers, setBeers] = useState<BeerType[]>([
    ...mainBeerList,
  ] as BeerType[]);

  const searchBeer = (search: string) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    let tempBeer = [...mainBeerList];
    if (searchTerm) {
      tempBeer = tempBeer.filter((beer) => {
        return beer.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (filter.includes(FILTER_LIST[1])) {
      tempBeer = tempBeer.filter((beer) => {
        return beer.abv > 6;
      });
    }

    if (filter.includes(FILTER_LIST[2])) {
      tempBeer = tempBeer.filter((beer) => {
        return beer.ph < 4;
      });
    }

    switch (sort) {
      case "A to Z":
        tempBeer = tempBeer.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "Z to A":
        tempBeer = tempBeer.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      default:
        break;
    }
    setBeers(tempBeer);
  }, [searchTerm, filter, sort, mainBeerList]);

  return (
    <ShoppingListContext.Provider
      value={{ sort, filter, updateFilter, updateSort, searchBeer, beers }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);
