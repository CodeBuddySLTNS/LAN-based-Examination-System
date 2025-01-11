import { Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { sqlQuery } from "../database/sqlQuery";

export const users = async (req: Request, res: Response) => {
  const query = `SELECT * FROM users`;
  const result = await sqlQuery(query);
  res.send(result);
};