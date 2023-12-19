import { Request, Response } from "express";
import { validationResult, ValidationError } from "express-validator";
import jwt from "jsonwebtoken";

interface ServerResponse {
  data?: Record<string, string> | null;
  errors?: Record<string, string> | null;
}

type ValidationErrorPath = {
  path?: string;
};

type ValidationErrorExtended = ValidationError & ValidationErrorPath;

const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const generateErrorObjectExpressValidator = (
  requestInstance: Request
) => {
  const expressValidatorErrorsArray = validationResult(requestInstance);
  const hasErrors = !expressValidatorErrorsArray.isEmpty();
  console.log(expressValidatorErrorsArray.array());
  const errors = generateLoginErrorMessages(
    expressValidatorErrorsArray.array()
  );

  return {
    hasErrors,
    errors,
  };
};

const generateLoginErrorMessages = (errors: ValidationErrorExtended[]) => {
  const errorsObject: Record<string, string> = {};
  errors.forEach((error) => {
    // Remove path from below line
    if (error.path && error.msg) {
      errorsObject[error.path] = error.msg;
    }
  });
  return errorsObject;
};

export const getJWTSignedToken = (
  data: Record<string, string>,
  expiresIn = "3h"
) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn,
  });
};

export const JWTTokenValidation = (token: string) => {
  if (!token) {
    return {
      isTokenValid: false,
      decodedData: {},
    };
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const isUserIdValid = !!decodedData.userId;
    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenExpired = (decodedData.exp ?? 0) <= currentTime;

    if (!isUserIdValid || isTokenExpired) {
      throw new Error();
    }

    return {
      isTokenValid: true,
      decodedData,
    };
  } catch (_) {
    return {
      isTokenValid: false,
      decodedData: {},
    };
  }
};

// export const sendServerResponse = (
//   responseInstance: Response,
//   data?: Record<string, string>,
//   errors?: Record<string, string>,
//   status?: number
// ) => {
//   const hasErrors: boolean = Object.values(errors ?? {}).length > 0;

//   const responseData: ServerResponse = hasErrors
//     ? { data: null, errors }
//     : { errors: null, data };

//   const statusCode = status ?? (hasErrors ? 500 : 200);

//   return responseInstance.status(statusCode).json(responseData);
// };
