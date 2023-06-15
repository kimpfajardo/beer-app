import React from "react";
import { BreadCrumbs } from "@/containers/BreadCrumbs/BeerDetails";
import { BrewerTips, Details, FoodPairing } from "@/containers/BeerDetails";
import { BeerType } from "@/mockBeer";
import { redirect } from "next/navigation";
import { Introduction } from "@/containers/BeerDetails/Introduct";

const getBeerDetails = async (id: string) => {
  const res = await fetch(`https://api.punkapi.com/v2/beers?ids=${id}`);
  const data = await res.json();
  return data;
};

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;
  const [beerData] = await getBeerDetails(id);
  if (!beerData) {
    return redirect("/beer-gallery");
  }
  const { name } = beerData as BeerType;

  return (
    <div>
      <BreadCrumbs />
      <h2 className="text-3xl font-bold mb-2">{name ?? ""}</h2>
      <div className="space-y-4">
        <Introduction {...beerData} />
        <Details {...beerData} />
        <FoodPairing {...beerData} />
        <BrewerTips {...beerData} />
      </div>
    </div>
  );
}
