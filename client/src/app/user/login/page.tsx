"use client";
import React, { ChangeEvent, useState } from "react";
import { CustomInputField } from "@/shared/components/custom-input/custom-input-field";
import { CustomInputFieldType } from "@/shared/components/custom-input/custom-input.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { CustomButtonTypes } from "@/shared/components/custom-button/custom-button.types";
import { useAuthContext } from "@/shared/context/auth-context/auth-context";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { authErrors, login } = useAuthContext();
  const emailErrorMessage = authErrors?.email ?? "";
  const passwordErrorMessage = authErrors?.password ?? "";

  const onLoginButtonClick = async () => {
    setSubmitting(true);
    const { email, password } = formData;
    await login(email, password);
    setSubmitting(false);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center mt-24">
      <form method="post">
        <h1 className="mb-5 font-bold text-2xl">Login</h1>
        <CustomInputField
          type={CustomInputFieldType.TEXT}
          placeholder="Enter Your Email"
          name="email"
          required={true}
          className="mb-2"
          errorMessage={emailErrorMessage}
          onChange={onInputChange}
          value={formData.email}
        />

        <CustomInputField
          type={CustomInputFieldType.PASSWORD}
          placeholder="Enter Your Password"
          name="password"
          required={true}
          className="mb-4"
          errorMessage={passwordErrorMessage}
          onChange={onInputChange}
          value={formData.password}
        />

        <CustomButton
          type={CustomButtonTypes.PRIMARY}
          onClick={onLoginButtonClick}
          disable={submitting}
        >
          Login
        </CustomButton>

        <a
          href="/user"
          className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white transition-all hover:bg-white hover:text-black ml-20"
        >
          Register
        </a>
      </form>
    </div>
  );
};

export default Login;
