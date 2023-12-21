"use client";
import React from "react";
import GetAll from "./get-all/page";
import { useAuthContext } from "@/shared/context/auth-context/auth-context";
import { useRouter } from "next/navigation";

const Todo = () => {
  const { getAuthToken } = useAuthContext();
  const token = getAuthToken();
  const router = useRouter();

  if (!token) {
    router.push("/login");
  }
  return <GetAll />;
};

export default Todo;
