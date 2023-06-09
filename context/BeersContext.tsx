"use client";
import { useBeerFilter } from "@/hooks/filters";
import { BeerType } from "@/mockBeer";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface URLParamsObject {
  key: string;
  value: string;
}

export interface BeerContext {
  beers: BeerType[];
  currentPage: number;
  totalPages: number;
  updateBeerList: (value?: string) => Promise<void>;
  loading: boolean;
}

const getBeers = async (beerName?: string): Promise<BeerType[]> => {
  const beerNameParam = beerName ? `&beer_name=${beerName}` : "";
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?per_page=80${beerNameParam}`
  );
  const data = await response.json();
  return data;
};

const BeerListContext = createContext<BeerContext>({} as BeerContext);

export const BeerProvider = ({ children }: { children: ReactNode }) => {
  const [beersRawList, setBeersRawList] = useState<BeerType[]>([]);
  const [beers, setBeers] = useState<BeerType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const updateBeerList = useCallback(async (value?: string) => {
    try {
      setLoading(true);
      const data = await getBeers(value);
      setBeersRawList(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const filterBeers = useCallback(
    (values: string[]) => {
      const highAlcohol = values.includes("high_alcohol");
      const highAcidity = values.includes("high_acidity");

      setBeers(() => {
        return [
          ...beersRawList.filter((item) => {
            if (highAlcohol && highAcidity) {
              return item.abv > 6 && item.ph < 4;
            }
            if (highAlcohol) {
              return item.abv > 6;
            }
            if (highAcidity) {
              return item.ph < 4;
            }
            return true;
          }),
        ];
      });
    },
    [beersRawList]
  );

  const filter = useBeerFilter();

  useEffect(() => {
    if (filter && beersRawList.length > 0) {
      filterBeers(filter.split(" "));
    }
  }, [filter, filterBeers, beersRawList]);

  useEffect(() => {
    updateBeerList();
  }, [updateBeerList]);

  return (
    <BeerListContext.Provider
      value={{
        beers,
        currentPage,
        totalPages,
        updateBeerList,
        loading,
      }}
    >
      {children}
    </BeerListContext.Provider>
  );
};

export const useBeerList = () => {
  return useContext(BeerListContext);
};
