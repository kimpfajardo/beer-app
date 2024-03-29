"use client";
import { useBeerList } from "@/context/BeersContext";
import { BeerCard } from "../BeerCard";
import { HashLoader } from "react-spinners";
import { Filters } from "../Filters";
import { FilterDetails } from "../FilterDetails";
import { Toast } from "@/components/Toast";
import { User } from "@supabase/supabase-js";

export const BeerList = ({ user }: { user: User }) => {
  const { beers } = useBeerList();
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-0">
        {beers.map((item, index) => (
          <BeerCard details={item} key={`beer-${index}`} user={user} />
        ))}
      </div>
    </>
  );
};

export const BeerListContainer = ({ user }: { user: User }) => {
  const { loading } = useBeerList();
  return (
    <>
      <Toast />
      {loading && (
        <div className="w-full justify-center  pt-10">
          <HashLoader className="mx-auto" />
        </div>
      )}
      {!loading && (
        <div className="w-full">
          <Filters />
          <FilterDetails />
          <div className="py-4">
            <BeerList user={user}/>
          </div>
        </div>
      )}
    </>
  );
};
