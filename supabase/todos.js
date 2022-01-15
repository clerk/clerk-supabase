import { supabaseClient } from ".";

const getTodos = async () => {
  const supabase = await supabaseClient();
  return supabase.from("todos").select("*");
};

const createTodo = async (newTodo, userID) => {
  const supabase = await supabaseClient();
  return supabase.from("todos").insert({ title: newTodo, user_id: userID });
};

export { getTodos, createTodo };
