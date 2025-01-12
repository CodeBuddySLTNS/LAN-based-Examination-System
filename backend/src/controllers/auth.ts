import { Request, Response } from "express";
import { sqlQuery } from "../database/sqlQuery";
import { User } from "../types/objects.types";
import { BAD_REQUEST } from "../constants/statusCodes";
import { validateSignup } from "../utils/validator";
import { CustomError } from "../utils/customError";

export const login = async (req: Request, res: Response) => {
  const data: User = {
    name: "Juan Tamad",
    username: "juantamad",
    password: "juantamad123"
  };
  console.log(data);
  const query = `INSERT INTO users (
    name,
    username,
    password
  ) VALUES (
    "${data.name}",
    "${data.username}",
    "${data.password}")`;
  const result = await sqlQuery(query);
  res.send(result);
};

export const signup = async (req: Request, res: Response) => {
  const { error, value } = validateSignup(req.body);
  
  if (error) {
    console.log(error);
    throw new CustomError(error.message, BAD_REQUEST);
    
  }
  
  console.log("ok", value);
  
  const query = `INSERT INTO users (
    name,
    username,
    password
  ) VALUES (
    "${value.name}",
    "${value.username}",
    "${value.password}")`;
  const result = await sqlQuery(query);
  res.send(result);
};
