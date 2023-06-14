import { Card } from "@/components/Card";
import { lobster } from "@/utils/fonts";
import { cn } from "@/utils/functions";
import { DetailFields } from "../DetailFields";
import Link from "next/link";

export const Introduction = () => {
  return (
    <Card>
      <div className="w-full">
        <div className="h-[250px] w-[250px] border shrink-0 mx-auto"></div>
        <div className="space-y-4 h-full py-2">
          <p
            className={cn(
              lobster.className,
              "text-xl text-amber-700 text-center"
            )}
          >
            A Real Bitter Experience.
          </p>
          <p className="text-gray-500">
            A light, crisp and bitter IPA brewed with English and American hops.
            A small batch brewed only once.
          </p>
          <div className="mt-auto">
            <p>
              <b>First brewed</b>: September 2007
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const Details = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Details</h3>
        <p className="text-amber-700 text-xs">Based on volume of 20 Litres</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 gap-y-6">
        <DetailFields label="Alcohol by Volume (ABV)" value="4.5%" />
        <DetailFields label="Acidity (pH)" value="4.4%" />
        <DetailFields label="International Bitterness Units (IBU)" value="60" />
        <DetailFields label="Standard Reference Method (SRM)" value="10" />
        <DetailFields label="Target Final Gravity (FG)" value="1010" />
        <DetailFields label="Target Original Gravity" value="1044" />
        <DetailFields label="Attenuation Level" value="75" />
        <DetailFields label="Boil Volume" value="25 litres" />
      </div>
    </Card>
  );
};

export const FoodPairing = () => {
  const mockFood = [
    "Spicy chicken tikka masala",
    "Grilled chicken quesadilla",
    "Caramel toffee cake",
  ];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Food pairing</h3>
      </div>
      <div className="space-y-2">
        <p>
          Here is a list of food that goes well with
          <span>
            <b>Buzz</b>
          </span>
        </p>
        <ul className="list-disc list-inside">
          {mockFood.map((food, index) => {
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

export const BrewerTips = () => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Brewer Tips</h3>
      </div>
      <p>
        The earthy and floral aromas from the hops can be overpowering. Drop a
        little Cascade in at the end of the boil to lift the profile with a bit
        of citrus.
      </p>
    </Card>
  );
};
