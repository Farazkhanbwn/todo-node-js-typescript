"use client";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { CustomButtonTypes } from "@/shared/components/custom-button/custom-button.types";
import { CustomInputField } from "@/shared/components/custom-input/custom-input-field";
import { CustomInputFieldType } from "@/shared/components/custom-input/custom-input.types";
import { useAuthContext } from "@/shared/context/auth-context/auth-context";
import React, { ChangeEvent, useState } from "react";

const SignUp = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });
  const { authErrors, signUp, login } = useAuthContext();

  const nameErrorMessage = authErrors?.name ?? "";
  const emailErrorMessage = authErrors?.email ?? "";
  const genderErrorMessage = authErrors?.gender ?? "";
  const passwordErrorMessage = authErrors?.password ?? "";

  const onLoginButtonClick = async () => {
    setSubmitting(true);
    const { name, email, gender, password } = formData;
    await signUp(name, email, gender, password);
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
        <h1 className="mb-5 font-bold text-2xl">SignUp</h1>
        <CustomInputField
          type={CustomInputFieldType.TEXT}
          placeholder="Enter Your name"
          name="name"
          required={true}
          className="mb-2"
          errorMessage={nameErrorMessage}
          onChange={onInputChange}
          value={formData.name}
        />

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
          type={CustomInputFieldType.TEXT}
          placeholder="Enter Your gender"
          name="gender"
          required={true}
          className="mb-2"
          errorMessage={genderErrorMessage}
          onChange={onInputChange}
          value={formData.gender}
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
          disable={submitting}
          type={CustomButtonTypes.PRIMARY}
          onClick={onLoginButtonClick}
        >
          Add New User
        </CustomButton>
        <a
          href="/"
          className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white transition-all hover:bg-white hover:text-black ml-10"
        >
          Login
        </a>
      </form>
    </div>
  );
};

export default SignUp;
