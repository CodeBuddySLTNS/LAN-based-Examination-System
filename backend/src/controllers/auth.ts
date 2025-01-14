import { Request, Response } from "express";
import { RowDataPacket, FieldPacket } from "mysql2";
import { sqlQuery, checkUser, createUser } from "../database/sqlQuery";
import { User } from "../types/objects.types";
import { BAD_REQUEST } from "../constants/statusCodes";
import { validateLogin, validateSignup } from "../utils/validator";
import { CustomError } from "../utils/customError";
export const login = async (req: Request, res: Response) => {
  const { error, value } = validateLogin(req.body);
  
  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }
  
  const userExist = await checkUser(value.username);
  if (userExist) {
    return res.send("userExist");
  }
  return res.send("doesn't exist")
};

export const signup = async (req: Request, res: Response) => {
  const { error, value } = validateSignup(req.body);
  
  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }
  
  const result = await createUser(value);
  res.send(result);
};
