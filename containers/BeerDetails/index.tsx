import { Card } from "@/components/Card";
import { DetailFields } from "../DetailFields";
import Link from "next/link";
import { BeerType } from "@/mockBeer";

export const Details = ({
  volume,
  abv,
  ph,
  ibu,
  srm,
  target_fg,
  target_og,
  attenuation_level,
  boil_volume,
}: Partial<BeerType>) => {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Details</h3>
        <p className="text-amber-700 text-xs">
          Based on volume of {volume?.value ?? "0"} {volume?.unit ?? "litres"}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 sm:gap-y-6">
        <DetailFields
          label="Alcohol by Volume (ABV)"
          value={`${abv ?? "N/A"} ${abv && "%"}`}
        />
        <DetailFields
          label="Acidity (pH)"
          value={`${ph ?? "N/A"} ${ph && "%"}`}
        />
        <DetailFields
          label="International Bitterness Units (IBU)"
          value={`${ibu ?? ""}`}
        />
        <DetailFields
          label="Standard Reference Method (SRM)"
          value={`${srm ?? ""}`}
        />
        <DetailFields
          label="Target Final Gravity (FG)"
          value={`${target_fg ?? ""}`}
        />
        <DetailFields
          label="Target Original Gravity (OG)"
          value={`${target_og ?? ""}`}
        />
        <DetailFields
          label="Attenuation Level"
          value={`${attenuation_level ?? ""}`}
        />
        <DetailFields
          label="Boil Volume"
          value={`${boil_volume?.value ?? "0"} ${
            boil_volume?.unit ?? "litres"
          }`}
        />
      </div>
    </Card>
  );
};

export const FoodPairing = ({ food_pairing, name }: Partial<BeerType>) => {
  const food = food_pairing ?? [];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Food pairing</h3>
      </div>
      <div className="space-y-2">
        <p>
          Here is a list of food that goes well with{" "}
          <span>
            <b>{name}</b>
          </span>
        </p>
        <ul className="list-disc list-inside">
          {food.map((food, index) => {
            const encodedSearchTerm = encodeURIComponent(food.toLowerCase());
            const link = `https://www.google.com/search?q=${encodedSearchTerm}`;
            return (
              <li key={`food-${index}`}>
                <Link
                  className="text-amber-700 hover:text-amber-600"
                  href={link}
                  target="_blank"
                >
                  {food}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export const BrewerTips = ({ brewers_tips }: Partial<BeerType>) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Brewer Tips</h3>
      </div>
      <p>{brewers_tips ?? ""}</p>
    </Card>
  );
};
