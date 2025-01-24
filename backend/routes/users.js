const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const { users, userInfo } = require("../controllers/users");

const router = Router();

router.get("/", tryCatch(users));
router.get("/user/:username", tryCatch(userInfo));

module.exports = router;
