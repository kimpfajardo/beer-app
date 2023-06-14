import React from "react";
import { BreadCrumbs } from "@/containers/BreadCrumbs/BeerDetails";
import {
  BrewerTips,
  Details,
  FoodPairing,
  Introduction,
} from "@/containers/BeerDetails";

export default function Page() {
  return (
    <div>
      <BreadCrumbs />
      <h2 className="text-3xl font-bold mb-2">Beer Name</h2>
      <div className="space-y-4">
        <Introduction />
        <Details />
        <FoodPairing />
        <BrewerTips />
      </div>
    </div>
  );
}
