import TodoService from "@/shared/services/todo-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Todo {
  _id: string;
  todoTask: string;
  todoDescription: string;
  // Add other properties based on your Todo structure
}

const useTodo = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>({});

  const addTodos = async (
    todoTask: string,
    todoDescription: string,
    token: string
  ) => {
    const { data, error } = await TodoService.addTodo(
      { todoTask, todoDescription },
      token
    );

    if (data) {
      setMessage("Data added successfully");
      router.push("/todo/get-all");
    }
    setError(error);
  };

  const getAllTodos = async (token: string) => {
    const { data, error } = await TodoService.getAllTodo(token);
    if (data) {
      setTodos(data);
    } else {
      // Handle error
      console.log(error);
    }
  };

  const deleteTodo = async (id: string, token: string) => {
    const { data, error } = await TodoService.deleteTodo(id, token);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));

    if (!data) {
      setMessage("Todo deleted successfully");
    } else {
      setMessage("Todo not deleted");
    }
  };

  return {
    addTodos,
    getAllTodos,
    deleteTodo,
    todos,
    message,
    error,
  };
};

export default useTodo;
