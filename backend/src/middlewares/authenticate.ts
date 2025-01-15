import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWTPayload } from "../types/objects.types"

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      jwt.verify("", process.env.SYSTEM_SECRET_KEY, (err, verifiedToken) => {
        next();
      });
    }
    next();
  } catch (e) {
    next();
  }
};

export default authenticate;
