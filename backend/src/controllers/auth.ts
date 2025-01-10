import { Request, Response } from "express";
import { sqlQuery } from "../database/sqlQuery";

export const login = async (req: Request, res: Response) => {
  const result = await sqlQuery(`CREATE TABLE users ( 
    id int primary key auto_increment,
    name varchar(255) not null,
    username varchar(255) not null unique,
    password varchar(255) not null
  )`);
  res.send(result);
};
