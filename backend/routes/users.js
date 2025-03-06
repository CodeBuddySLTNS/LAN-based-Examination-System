const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/users");

const router = Router();

router.get("/", tryCatch(controller.users));
router.get("/user/:username", tryCatch(controller.userInfo));
router.delete("/user/:username", tryCatch(controller.deleteAccount));

module.exports = router;
