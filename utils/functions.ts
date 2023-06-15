import { SupabaseClient } from "@supabase/supabase-js";
import { ClassValue, clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const modifyDrawerState = (arr: boolean[], index: number): boolean[] => {
  if (arr[index] === undefined) {
    throw new Error("Invalid index");
  }

  const newValue = !arr[index];
  arr[index] = newValue;

  if (newValue) {
    arr.fill(true, 0, index);
  } else {
    arr.fill(false, index + 1);
  }

  return arr;
};

// ADD TO SHOPPING LIST FUNCTION

export const fetchShoppingList = async (
  userId: string,
  supabase: SupabaseClient<any, "public", any>
) => {
  const shoppingList = await supabase
    .from("shopping-list")
    .select("*")
    .eq("user_id", userId);
  return shoppingList;
};

export const createShoppingList = async (
  userId: string,
  supabase: SupabaseClient<any, "public", any>,
  callback?: VoidFunction
) => {
  const insertShoppingListRes = await supabase
    .from("shopping-list")
    .insert({ user_id: userId, created_at: new Date() });
  if (insertShoppingListRes.error) {
    toast.error(insertShoppingListRes.error.message);
    return;
  }
  return callback?.();
};

export type BeerType = { [x: string]: any };

export const updateBeerItemCount = async (
  beer: BeerType,
  supabase: SupabaseClient<any, "public", any>,
  qty: number
) => {
  const updateRes = await supabase
    .from("beers")
    .update({ count: parseInt(beer.count) + qty })
    .eq("beer_id", beer.beer_id);

  if (updateRes.error) {
    toast.error(updateRes.error.message);
    return;
  } else {
    toast.success("Updated shopping list");
  }
};

export const addNewBeerToShoppingList = async (
  shoppingListId: string,
  supabase: SupabaseClient<any, "public", any>,
  qty: number,
  beerId: number
) => {
  const insertRes = await supabase
    .from("beers")
    .insert({
      beer_id: beerId,
      list_id: shoppingListId,
      count: qty,
      created_at: new Date(),
    });
  if (insertRes.error) {
    toast.error(insertRes.error.message);
    return;
  } else {
    toast.success("Added to shopping list");
  }
};
