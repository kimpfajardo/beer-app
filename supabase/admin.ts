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
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (!error) return callback.onSuccess();
  callback.onError();
};

export default supabase;
