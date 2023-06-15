"use client";
import { BeerType } from "@/mockBeer";
import { FILTER_LIST, SORT_LIST } from "@/utils/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ShoppingListBeerType extends BeerType {
  [x: string]: any;
}

export interface ShoppingListContext {
  sort: string;
  updateSort: (sort: string) => void;
  filter: string[];
  updateFilter: (filter: string) => void;
  searchBeer: (search: string) => void;
  beers: ShoppingListBeerType[];
  refreshBeerList: () => void;
  loading: boolean;
}

export const ShoppingListContext = createContext<ShoppingListContext>(
  {} as ShoppingListContext
);

export const ShoppingListProvider = ({
  children,
  beerList,
}: {
  children: ReactNode;
  beerList: {
    [x: string]: any;
  }[];
}) => {
  const [sort, setSort] = useState<string>(SORT_LIST[0] as string);
  const [filter, setFilter] = useState<string[]>([FILTER_LIST[0]] as string[]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const [mainBeerList, setMainBeerList] = useState<ShoppingListBeerType[]>(
    beerList as ShoppingListBeerType[]
  );
  const [searchTerm, setSearchTerm] = useState<string>("" as string);
  const [beers, setBeers] = useState<ShoppingListBeerType[]>(
    mainBeerList as ShoppingListBeerType[]
  );

  const searchBeer = (search: string) => {
    setSearchTerm(search);
  };

  const getBeerDataById = async (
    beerList: {
      [x: string]: any;
    }[]
  ) => {
    const beerListWithData = await Promise.all(
      beerList.map(async (beer) => {
        const res = await fetch(
          `https://api.punkapi.com/v2/beers?ids=${beer.beer_id}`
        ).then((res) => res.json());
        if (!res.error) {
          return { ...beer, ...res[0] };
        }
        return beer;
      })
    );
    return beerListWithData;
  };

  const getBeerList = async () => {
    const supabase = createClientComponentClient();
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

  const refreshBeerList = async () => {
    setLoading(true);
    const beerList = await getBeerList();
    const beerListWithData = await getBeerDataById(beerList);
    setMainBeerList(beerListWithData);
    setLoading(false);
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
          if (b.name > a.name) return 1;
          if (b.name < a.name) return -1;
          return 0;
        });
        break;
      case "Z to A":
        tempBeer = tempBeer.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        break;
      default:
        break;
    }
    setBeers(tempBeer);
  }, [searchTerm, filter, sort, mainBeerList]);

  return (
    <ShoppingListContext.Provider
      value={{
        sort,
        filter,
        updateFilter,
        updateSort,
        searchBeer,
        beers,
        refreshBeerList,
        loading,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext);
