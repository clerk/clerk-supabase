import { createClient } from "@supabase/supabase-js";

const supabaseClient = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  // get a supabase valid token
  const res = await fetch("/api/getSupabaseToken");
  const { jwt } = await res.json();
  supabase.auth.session = () => ({
    access_token: jwt,
  });

  return supabase;
};

export { supabaseClient };
