import { Button } from "@/components/Button";
import {
  addNewBeerToShoppingList,
  cn,
  createShoppingList,
  updateBeerItemCount,
} from "@/utils/functions";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AddToShopList = ({
  mouseLeft,
  id,
}: {
  mouseLeft?: boolean;
  id: number;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(false);

  const addToShoppingList: () => void = useCallback(async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session) {
      await supabase.auth.signOut();
      router.replace("/auth");
    }
    if (sessionError) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }
    const { data, error: shoppingListError } = await supabase
      .from("shopping-list")
      .select("*")
      .eq("user_id", session?.user.id);

    if (shoppingListError) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }
    const shoppingListData = data?.[0] ?? null;
    const hasShopListData = !!shoppingListData;

    if (!hasShopListData) {
      await createShoppingList(session?.user.id as string, supabase);
      return addToShoppingList();
    }
    const shoppingListId = shoppingListData.list_id;
    const shoppingListItems = await supabase
      .from("beers")
      .select("*")
      .eq("list_id", shoppingListId);
    if (shoppingListItems.error) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }
    const shoppingListItemsData = shoppingListItems?.data ?? [];
    const filteredBeerList = shoppingListItemsData.filter(
      (item) => item.beer_id == id
    );
    if (filteredBeerList.length > 0) {
      updateBeerItemCount(filteredBeerList[0], supabase, qty);
    } else {
      addNewBeerToShoppingList(shoppingListId, supabase, qty, id);
    }
  }, [qty, id, supabase, router]);

  useEffect(() => {
    if (mouseLeft) {
      setShow(false);
      setQty(1);
    }
  }, [mouseLeft]);

  const toggleShow = () => {
    setShow((prev) => !prev);
    setQty(1);
  };

  return (
    <div className="relative ">
      <Button
        className="p-2 absolute top-0 z-20 w-9 h-9"
        variant={"primary"}
        roundness={"circular"}
        onClick={toggleShow}
      >
        <div className="relative w-full h-full flex justify-center">
          <PlusIcon
            className={cn(
              "w-5 absolute transition duration-300 opacity-0 transform rotate-45",
              show && "opacity-100"
            )}
          />
          <ShoppingBagIcon
            className={cn(
              "w-4 absolute transition duration-300 transform",
              show && "rotate-90 opacity-0"
            )}
          />
        </div>
      </Button>
      <div
        className={cn(
          "max-w-0 w-0 h-9 ml-[18px] flex justify-center items-center bg-indigo-500 transition-all opacity-0 absolute top-0 z-10",
          show && "opacity-100 w-[160px] max-w-[160px]"
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-4 opacity-100 transition",
            !show && "opacity-0"
          )}
        >
          <button
            className="bg-indigo-700 p-1 rounded text-white"
            onClick={() => setQty((prev) => prev - 1 || 1)}
          >
            <MinusIcon className="w-4" />
          </button>
          <span className="text-white">{qty}</span>
          <button
            className="bg-indigo-700 p-1 rounded text-white"
            onClick={() => setQty((prev) => prev + 1)}
          >
            <PlusIcon className="w-4" />
          </button>
        </div>
        <Button
          className={cn(
            !show && "opacity-0",
            "w-9 h-9 transition flex justify-center items-center",
            "hover:bg-yellow-400 bg-yellow-500 active:bg-yellow-600",
            "absolute -right-[18px] text-white shrink-0 p-0"
          )}
          roundness={"circular"}
          onClick={async () => {
            setLoading(true);
            await addToShoppingList();
            setShow(false);
            setLoading(false);
          }}
          disabled={loading}
        >
          <CheckIcon className="w-5" />
        </Button>
      </div>
    </div>
  );
};
