const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const { users } = require("../controllers/users");

const router = Router();

router.get("/", tryCatch(users));

module.exports = router;
