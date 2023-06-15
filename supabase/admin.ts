import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jzndmoxgjmrpkvshnooe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bmRtb3hnam1ycGt2c2hub29lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NjU1NTY1MSwiZXhwIjoyMDAyMTMxNjUxfQ.LVCPZI5nhKIbW21FhUhlbGxpMsE01cqpvE40LQIcKZo";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const deleteUser = async (
  userId: string,
  callback: {
    onSuccess: () => void;
    onError: () => void;
  }
) => {
  const { data: shoppingListId } = await supabase
    .from("shopping-list")
    .select()
    .eq("user_id", userId);

  if (shoppingListId?.length === 0) {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      return callback.onError();
    }
    return callback.onSuccess();
  }

  const { error: beerDeleteError } = await supabase
    .from("beers")
    .delete()
    .eq("list_id", shoppingListId?.[0].list_id);

  if (beerDeleteError) {
    return callback.onError();
  }
  const { error: shoppingListDeleteError } = await supabase
    .from("shopping-list")
    .delete()
    .eq("user_id", userId);

  if (shoppingListDeleteError) {
    return callback.onError();
  }
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    return callback.onError();
  }
  callback.onSuccess();
};

export default supabase;
