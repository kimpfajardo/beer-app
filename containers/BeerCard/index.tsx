"use client";
import Image from "next/image";
import useMouseLeave from "use-mouse-leave";
import { AddToShopList } from "../AddToShopList";
import { BeerMugIcon, WaterIcon } from "@/components/Icons";

export const BeerCard = () => {
  const [mouseLeft, ref] = useMouseLeave();

  return (
    <div
      className="border-0 overflow-hidden relative rounded-2xl bg-white p-4 py-6 pt-8 hover:shadow-md transition-[box-shadow] duration-300 group"
      ref={ref}
    >
      <div className="group-hover:block hidden absolute -mt-4">
        <AddToShopList mouseLeft={mouseLeft} />
      </div>
      <div className="flex justify-center cursor-pointer h-[250px]">
        <Image
          className="transition group-hover:scale-95"
          src="/2.png"
          alt=""
          width={64}
          height={64}
        />
      </div>
      <div>
        <div className="px-4 sm:p-4 text-center">
          <p className="font-bold mb-2">Remy Martin</p>
          <p className="text-gray-400 text-xs mb-4">A Real Bitter Experience</p>
          <hr className="mb-4 w-10 mx-auto border-b-2 border-yellow-300" />
          <div className="flex justify-center items-center space-x-4">
            <div className="text-black flex flex-col items-center">
              <BeerMugIcon className="text-amber-600 text-2xl" />
              <span>4.5</span>
            </div>
            <div className="text-black flex flex-col items-center">
              <WaterIcon className="text-indigo-600 text-2xl" />
              <span>4.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
