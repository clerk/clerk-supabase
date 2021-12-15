import { createClient } from "@supabase/supabase-js";

const getSupabase = async () => {
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

const getTodos = async () => {
  const supabase = await getSupabase();
  return supabase.from("todo").select("*");
};

const createTodo = async (newTodo, userID) => {
  const supabase = await getSupabase();
  return supabase.from("todo").insert({ content: newTodo, user_id: userID });
};

export { getTodos, createTodo, getSupabase };
