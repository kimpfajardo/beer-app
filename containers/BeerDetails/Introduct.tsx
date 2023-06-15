"use client";
import { Card } from "@/components/Card";
import { BeerType } from "@/mockBeer";
import { lobster } from "@/utils/fonts";
import { cn } from "@/utils/functions";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import useMouseLeave from "use-mouse-leave";
import { AddToShopList } from "../AddToShopList";
import { Toast } from "@/components/Toast";
import { User } from "@supabase/supabase-js";

export const Introduction = ({
  image_url,
  tagline,
  description,
  first_brewed,
  name,
  id,
}: Partial<BeerType> ) => {
  const date = moment(first_brewed ?? "", "MM/YYYY");
  const [mouseLeft, ref] = useMouseLeave();
  const [qty, setCount] = useState<number>(1 as number);
  return (
    <div className="group" ref={ref}>
      <Toast />
      <div className=" absolute m-4">
        <AddToShopList mouseLeft={mouseLeft} id={id ?? 0} />
      </div>
      <Card>
        <div className="w-full relative">
          <div className="w-32 h-32 sm:h-[250px] sm:w-[250px] shrink-0 mx-auto relative">
            <Image
              className="object-contain"
              src={image_url ?? ""}
              fill
              alt={name ?? ""}
            />
          </div>
          <div className="space-y-4 h-full py-2">
            <p
              className={cn(
                lobster.className,
                "text-xl text-amber-700 text-center lowercase"
              )}
            >
              {tagline ?? ""}
            </p>
            <p className="text-gray-500">{description ?? ""}</p>
            <div className="mt-auto">
              <p>
                <b>First brewed</b>: {moment(date).format("MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
