import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../types/objects.types"

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const authHeader = req.headers.authorization;
    const secretKey: jwt.Secret = process.env.SYSTEM_SECRET_KEY || "";
    
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      jwt.verify("", secretKey, (err, verifiedToken) => {
        next();
      });
    }
    next();
  } catch (e) {
    next();
  }
};

export default authenticate;
