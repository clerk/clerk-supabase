import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useUser, UserButton } from "@clerk/nextjs";
import { createTodo, getTodos } from "../utils/supabase";

export default function Home() {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);

  // load todos
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const { data: todos } = await getTodos();
        setTodos(todos);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <header className={styles.header}>
        <div>Clerk + Supabase</div>
        <UserButton />
      </header>
      <main className={styles.main}>
        {loading ? (
          <div className={styles.container}>Loading</div>
        ) : (
          <div className={styles.container}>
            <AddTodoForm addTodo={addTodo} />
            {todos?.length > 0 ? (
              <ol>
                {todos.map((todo) => (
                  <li key={todo.id}>{todo.content}</li>
                ))}
              </ol>
            ) : (
              <p>You have completed all todos!</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}

function AddTodoForm({ addTodo }) {
  const { id } = useUser();
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo === "") {
      return;
    }

    const resp = await createTodo(newTodo, id);
    addTodo(resp.data[0]);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
      <button>Add Todo</button>
    </form>
  );
}
