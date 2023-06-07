"use client";
import { PageProps } from "@/.next/types/app/layout";
import { BeerCard } from "@/containers/BeerCard";
import { Filters } from "@/containers/Filters";
import { mockBeer } from "@/mockBeer";

const getBeers = async () => {
  const response = await fetch("https://api.punkapi.com/v2/beers");
  const data = await response.json();
  return data;
};

export default async function Products(props: PageProps) {

  return (
    <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8 ">
      <div className="w-full">
        <Filters />
        <div>
          <h3 className="text-2xl text-center pt-2 font-bold">ABV &gt; 6.0%</h3>
          <hr className="w-16 border-0  border-b-4 mx-auto py-2 mb-4 border-yellow-300" />
        </div>
        <div className="py-4">
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3].map((item, index) => (
              <BeerCard key={`beer-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
