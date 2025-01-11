import { Router } from "express";
import { tryCatch } from "../utils/tryCatch";
import { users } from "../controllers/users";

const router = Router();

router.get("/", tryCatch(users));

export default router;
