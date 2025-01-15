import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/customError";
import { User } from "../types/objects.types";
import { validateLogin, validateSignup } from "../utils/validator";
import { sqlQuery, checkUser, createUser } from "../database/sqlQuery";
import {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  CONFLICT
} from "../constants/statusCodes";

export const login = async (req: Request, res: Response) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const userExist = await checkUser(value.username);

  if (userExist && typeof userExist !== "boolean") {
    const isMatch = await bcrypt.compare(value.password, userExist[0].password);
    
    if (isMatch) {
      return res.send("Logged In.");
    }
    
    throw new CustomError("Incorrect Password", CONFLICT);
  }
  return res.status(NOT_FOUND).send("doesn't exist");
};

export const signup = async (req: Request, res: Response) => {
  const { error, value } = validateSignup(req.body);

  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }

  const saltRounds = 10;
  value.password = await bcrypt.hash(value.password, saltRounds);

  const result = await createUser(value);
  res.status(CREATED).send(result);
};
