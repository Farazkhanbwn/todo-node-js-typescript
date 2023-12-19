import { Router } from "express";
import {
  loginController,
  signUpController,
  userAuthenticationStatus,
} from "./user-controller";
import { loginRequestValidator, signUpRequestValidator } from "./user-model";

const userRoute = Router();

userRoute.post("/signUp", signUpRequestValidator, signUpController);

userRoute.post("/login", loginRequestValidator, loginController);

userRoute.get("/validate-status", userAuthenticationStatus);

export default userRoute;
