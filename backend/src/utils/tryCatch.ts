import { Request, Response, NextFunction } from "express";
import { ControllerAsParam } from "../types/functions.types";

export const tryCatch =
  (controller: ControllerAsParam) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
