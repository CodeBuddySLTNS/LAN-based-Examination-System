const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const { login, signup } = require("../controllers/auth");

const router = Router();

router.post("/login", tryCatch(login));
router.post("/signup", tryCatch(signup));

module.exports = router;
