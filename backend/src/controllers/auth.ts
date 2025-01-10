import { Request, Response } from "express";
import { CreateTable } from "../database/dbServices";
import dbconn from "../database/sqlConnection";

export const login = async (req: Request, res: Response) => {
  const result = await CreateTable("CREATE TABLE test( name varchar(255) not null unique)");
};
