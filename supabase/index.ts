import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jzndmoxgjmrpkvshnooe.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
