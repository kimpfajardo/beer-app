"use client";
import { useBeerList } from "@/context/BeersContext";
import { BeerCard } from "../BeerCard";
import { HashLoader } from "react-spinners";

export const BeerList = () => {
  const { beers } = useBeerList();
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {beers.map((item, index) => (
          <BeerCard details={item} key={`beer-${index}`} />
        ))}
      </div>
    </>
  );
};
