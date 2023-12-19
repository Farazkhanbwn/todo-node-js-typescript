import { NextFunction, Request, Response } from "express";
import { JWTTokenValidation } from "../src/utils";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization;

  const { isTokenValid } = JWTTokenValidation(token?.slice(7) || "");
  console.log("isTokenValid ", isTokenValid);

  if (!isTokenValid) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  next();
};
