"use client";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { CustomButtonTypes } from "@/shared/components/custom-button/custom-button.types";
import { CustomInputField } from "@/shared/components/custom-input/custom-input-field";
import { CustomInputFieldType } from "@/shared/components/custom-input/custom-input.types";
import { useAuthContext } from "@/shared/context/auth-context/auth-context";
import useTodo from "@/shared/hooks/todo-hook/useTodo";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Todo {
  _id: string;
  todoTask: string;
  todoDescription: string;
  // Add other properties based on your Todo structure
}

const AddTodo = () => {
  const { getAuthToken } = useAuthContext();
  const { error, addTodos } = useTodo();
  const [formData, setFormData] = useState({
    todoTask: "",
    todoDescription: "",
  });

  const taskErrorMessage = error?.todoTask ?? "";
  const descriptionErrorMessage = error?.todoDescription ?? "";

  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { todoTask, todoDescription } = formData;
    await addTodos(todoTask, todoDescription, getAuthToken());
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className=" flex justify-center mt-24">
      <form method="post" onSubmit={addTodo}>
        <h2 className="mb-5 font-bold text-2xl">Add Todo</h2>
        <CustomInputField
          type={CustomInputFieldType.TEXT}
          placeholder="Enter Your Task"
          name="todoTask"
          required={true}
          className="mb-2"
          errorMessage={taskErrorMessage}
          onChange={onInputChange}
          value={formData.todoTask}
        />

        <CustomInputField
          type={CustomInputFieldType.TEXT}
          placeholder="Enter Your Description"
          name="todoDescription"
          required={true}
          className="mb-4"
          errorMessage={descriptionErrorMessage}
          onChange={onInputChange}
          value={formData.todoDescription}
        />

        <CustomButton type={CustomButtonTypes.PRIMARY}>Add Todo </CustomButton>
        <a
          href="/todo/get-all"
          className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white transition-all hover:bg-white hover:text-black ml-14"
        >
          All Todos
        </a>
      </form>
    </div>
  );
};

export default AddTodo;
