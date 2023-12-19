import { check } from "express-validator";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
});

const User = model("user", userSchema);
export default User;

export const signUpRequestValidator = [
  check("name", "Name is Empty").trim().notEmpty(),
  check("email", "Please write a valid email").trim().isEmail(),
  check("password", "Password must be more than 8 characters ").isLength({
    min: 8,
  }),
  check("gender", "please Select a Gender").notEmpty(),
];

export const loginRequestValidator = [
  check("email", "Please write a valid email").trim().isEmail(),
  check("password", "Password must be more than 8 characters ").isLength({
    min: 8,
  }),
];
