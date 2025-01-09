import { Request, Response, NextFunction } from "express";

export type ControllerAsParam = (req: Request, res: Response) => void;