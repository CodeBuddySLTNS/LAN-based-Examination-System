import { Request, Response } from "express";
import { RowDataPacket, FieldPacket } from "mysql2";
import { sqlQuery } from "../database/sqlQuery";
import { User } from "../types/objects.types";
import { BAD_REQUEST } from "../constants/statusCodes";
import { validateLogin, validateSignup } from "../utils/validator";
import { CustomError } from "../utils/customError";

export const login = async (req: Request, res: Response) => {
  const { error, value } = validateLogin(req.body);
  
  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }
  
  const query = `SELECT EXISTS (SELECT * FROM users WHERE username = "${value.username}" LIMIT 1)`;
  const result = await sqlQuery(query);
  if (result) {
    console.log(result[0].length);
    if (result[0][0].length) {
      return res.send({ found: true, result: result})
    }
    res.send({ found: false, result: result})
  }
};

export const signup = async (req: Request, res: Response) => {
  const { error, value } = validateSignup(req.body);
  
  if (error) {
    throw new CustomError(error.message, BAD_REQUEST);
  }
  
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
