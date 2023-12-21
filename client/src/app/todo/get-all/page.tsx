"use client";
import { useAuthContext } from "@/shared/context/auth-context/auth-context";
import React, { useEffect } from "react";
import useTodo from "@/shared/hooks/todo-hook/useTodo";
import "../todo.css";
import { getTokenValues } from "@/shared/utils";

const GetAll = () => {
  const { getAuthToken } = useAuthContext();
  const { getAllTodos, todos, deleteTodo } = useTodo();

  const data = getTokenValues();
  console.log("token values ", data);

  useEffect(() => {
    getAllTodos(getAuthToken());
  }, []);

  const todoDelete = async (id: string) => {
    await deleteTodo(id, getAuthToken());
  };

  if (todos.length < 1) {
    return null;
  }

  return (
    <div>
      <h1>UserName : </h1>
      <h2 className="font-bold m-5">All Todos</h2>

      <table className="mb-5">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo?._id}>
              <td>{todo?.todoTask}</td>
              <td>{todo?.todoDescription}</td>
              <td className="bg-gray-200">
                <button onClick={() => todoDelete(todo?._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href="/todo/add"
        className="rounded-full border border-black bg-black py-1 px-2 text-sm text-white transition-all hover:bg-white hover:text-black ml-2"
      >
        Add Todo
      </a>
    </div>
  );
};

export default GetAll;
