const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/users");

const router = Router();

router.get("/", tryCatch(controller.users));
router.get("/user/:username", tryCatch(controller.userInfo));
router.patch("/user/edit", tryCatch(controller.editAccount));
router.delete("/user/delete", tryCatch(controller.deleteAccount));
router.patch("/user/verify", tryCatch(controller.verifyAccount));

module.exports = router;
