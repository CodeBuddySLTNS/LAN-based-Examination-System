const { Router } = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/questions");

const router = Router();

router.get("/", tryCatch(controller.questions));
router.post("/add", tryCatch(controller.addQuestion));
router.patch("/edit", tryCatch(controller.editQuestion));
router.delete("/delete", tryCatch(controller.deleteQuestion));

module.exports = router;
