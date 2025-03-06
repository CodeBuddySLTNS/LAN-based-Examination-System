const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/users");

const router = Router();

router.get("/", tryCatch(controller.users));
router.patch("/user", tryCatch(controller.verifyAccount));
router.delete("/user", tryCatch(controller.deleteAccount));
router.get("/user/:username", tryCatch(controller.userInfo));

module.exports = router;
