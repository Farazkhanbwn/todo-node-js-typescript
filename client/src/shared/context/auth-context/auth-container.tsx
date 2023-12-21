"use client";
import AuthService from "@/shared/services/auth-service";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useLayoutEffect, useState } from "react";
import { authStateDefaultValues } from "./auth-interface";
import { AuthProvider } from "./auth-context";

const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState(authStateDefaultValues);
  const router = useRouter();

  const getAuthToken = () => localStorage.getItem("token") ?? "";

  const checkAuthOnLoad = async () => {
    const token = localStorage.getItem("token");
    const data = await AuthService.validateUser(token ?? "");
    // Testing
    !data.data && router.push("/");
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      isAuthenticated: data.data,
    }));
  };

  useLayoutEffect(() => {
    checkAuthOnLoad();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await AuthService.login({ email, password });
    if (!!data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/todo/get-all");
    }
    setAuthState((prevState) => ({
      ...prevState,
      authErrors: error,
    }));
  };

  const signUp = async (
    name: string,
    email: string,
    gender: string,
    password: string
  ) => {
    const { data, error } = await AuthService.signUp({
      name,
      email,
      gender,
      password,
    });

    if (data) {
      // Update your auth state if needed
      setAuthState((prevState) => ({
        ...prevState,
        authValue: data,
      }));
      router.push("/user/login");
    }

    setAuthState((prevState) => ({
      ...prevState,
      authErrors: error,
    }));
  };

  // if (authState.loading) {
  //   return null;
  // }
  return (
    <AuthProvider value={{ ...authState, login, signUp, getAuthToken }}>
      {children}
    </AuthProvider>
  );
};

export default AuthContainer;
