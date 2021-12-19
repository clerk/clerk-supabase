import { supabaseClient } from ".";

const getTodos = async () => {
  const supabase = await supabaseClient();
  return supabase.from("todo").select("*");
};

const createTodo = async (newTodo, userID) => {
  const supabase = await supabaseClient();
  return supabase.from("todo").insert({ content: newTodo, user_id: userID });
};

export { getTodos, createTodo };
