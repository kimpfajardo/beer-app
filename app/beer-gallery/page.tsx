'use client'
import { BeerList } from "@/containers/BeerList";
import { FilterDetails } from "@/containers/FilterDetails";
import { Filters } from "@/containers/Filters";
import { useBeerList } from "@/context/BeersContext";
import { HashLoader } from "react-spinners";

export default function Products() {
  const { loading } = useBeerList();
  return (
    <div className="mx-auto max-w-7xl p-0 sm:px-6 lg:px-8 ">
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
            <BeerList />
          </div>
        </div>
      )}
    </div>
  );
}
