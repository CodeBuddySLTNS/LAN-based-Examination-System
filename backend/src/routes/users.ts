import { Router, Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { CustomError } from "../utils/customError";

const router = Router();

router.get(
  "/",
  tryCatch(async (req, res) => {
    throw new CustomError(300,"hello error",503);
    res.send([]);
  })
);

export default router;