import { Request, Response } from "express";
import { sqlQuery } from "../database/sqlQuery";
import { User } from "../types/objects.types";

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
