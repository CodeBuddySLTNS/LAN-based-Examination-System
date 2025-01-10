import { Router, Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { login } from "../controllers/auth"

const router = Router();

router.get("/login", tryCatch(login));

export default router;