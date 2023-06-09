import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { BeerType } from "@/mockBeer";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export const ShopListCard = ({ details }: { details: BeerType }) => {
  const { name, image_url } = details;
  return (
    <Card className="py-2">
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <Image src={image_url} width={48} height={48} alt={name} />
        <div className="space-y-6">
          <div>
            <p className="font-bold text-xl">{name}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button className="h-8 w-8 p-0 rounded-full flex justify-center items-center">
                <PlusIcon className="w-5 h-5" />
              </Button>
              <input className="border-0 w-10 h-10 text-sm text-center text" />
              <Button className="h-8 w-8 p-0 rounded-full flex justify-center items-center">
                <MinusIcon className="w-5 h-5" />
              </Button>
            </div>
            <Button variant='secondary' className="h-8 w-8 p-0 rounded-full flex justify-center items-center ring-red-400">
              <TrashIcon className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
