"use client";
import Image from "next/image";
import useMouseLeave from "use-mouse-leave";
import { AddToShopList } from "../AddToShopList";
import { BeerMugIcon, WaterIcon } from "@/components/Icons";
import { BeerType } from "@/mockBeer";
import Link from "next/link";
export interface BeerCardProps {
  details: BeerType;
}

export const BeerCard = ({ details }: BeerCardProps) => {
  const [mouseLeft, ref] = useMouseLeave();
  const { name, tagline, image_url, abv, ph, id } = details;

  return (
    <div
      className="border border-gray-300 overflow-hidden relative rounded-2xl bg-white p-4 py-6 pt-8 hover:shadow-md transition-[box-shadow] duration-300 group"
      ref={ref}
    >
      <div className="group-hover:block hidden absolute -mt-4">
        <AddToShopList mouseLeft={mouseLeft} id={id} />
      </div>
      <div className="flex justify-center cursor-pointer h-[250px] relative">
        <Link className="hidden lg:block" href={`/beer-details/${id}`} prefetch>
          <Image
            className="transition group-hover:scale-95 object-contain"
            src={image_url ?? "/2.png"}
            alt=""
            fill
            sizes="(min-width: 0px) 640px, 100vw"
          />
        </Link>
        <Image
          className="transition group-hover:scale-95 object-contain lg:hidden"
          src={image_url ?? "/2.png"}
          alt=""
          fill
          sizes="(min-width: 0px) 640px, 100vw"
        />
      </div>
      <div>
        <div className="px-4 sm:p-4 text-center">
          <Link href={`/beer-details/${id}`} prefetch>
            <p className="font-bold mb-2 hover:underline">{name}</p>
          </Link>
          <p className="text-gray-400 text-xs mb-4">{tagline}</p>
          <hr className="mb-4 w-10 mx-auto border-b-2 border-yellow-300" />
          <div className="flex justify-center items-center space-x-4">
            <div className="text-black flex flex-col items-center">
              <BeerMugIcon className="text-amber-600 text-2xl" />
              <span>{abv}</span>
            </div>
            <div className="text-black flex flex-col items-center">
              <WaterIcon className="text-indigo-600 text-2xl" />
              <span>{ph ?? "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
