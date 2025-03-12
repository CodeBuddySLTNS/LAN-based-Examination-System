const express = require("express");
const controller = require("../controllers/subjects");
const Router = express.Router();
const { tryCatch } = require("../utils/tryCatch");

Router.get("/", tryCatch(controller.subjects));
Router.post("/add", tryCatch(controller.addSubject));
Router.patch("/edit", tryCatch(controller.editSubject));
Router.delete("/delete", tryCatch(controller.deleteSubject));

module.exports = Router;
