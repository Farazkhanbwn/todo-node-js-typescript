import { Request, Response } from "express";
import User from "./user-model";
import {
  JWTTokenValidation as isJWTTokenValid,
  generateErrorObjectExpressValidator,
  getJWTSignedToken,
} from "../utils";

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, password, gender } = req.body;
  console.log(name, email, password, gender);
  const { errors, hasErrors } = generateErrorObjectExpressValidator(req);
  if (hasErrors) {
    return res.status(404).json({ data: null, error: errors });
  }

  try {
    const user = new User({ name, email, password, gender });

    await user.save();
    return res.status(200).json({ error: null, data: "signUp Sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ data: null, error: "Unexpected Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { errors, hasErrors } = generateErrorObjectExpressValidator(req);
  if (hasErrors) {
    return res.status(404).json({ data: null, error: errors });
  }

  try {
    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({
        data: null,
        error: "No Such User Found",
      });
    }

    if (user?.password !== password) {
      return res.status(404).json({ data: null, error: "Incoreect Password" });
    }

    const token = getJWTSignedToken({
      userName: user.name,
      gender: user.gender,
      email: user.email,
    });
    return res.status(200).json({ error: null, data: { token } });
  } catch (error) {
    return res
      .status(500)
      .json({ data: null, error: "Unexpected Server Error" });
  }
};

export const userAuthenticationStatus = async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";
  const { isTokenValid } = isJWTTokenValid(token.slice(7));
  return res.status(200).json({ error: null, data: isTokenValid });
};
