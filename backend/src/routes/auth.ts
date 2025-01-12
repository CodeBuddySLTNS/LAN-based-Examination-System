import { Router, Request, Response } from "express";
import { tryCatch } from "../utils/tryCatch";
import { login, signup } from "../controllers/auth"

const router = Router();

router.post("/login", tryCatch(login));
router.post("/signup", tryCatch(signup));

export default router;