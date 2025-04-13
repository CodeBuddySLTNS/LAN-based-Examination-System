const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/exams");
const Router = express.Router();

Router.get("/", tryCatch(controller.exams));
Router.post("/add", tryCatch(controller.addExam));
Router.patch("/edit/:mode", tryCatch(controller.editExam));
Router.delete("/delete/:id", tryCatch(controller.deleteExam));
Router.post("/submit", tryCatch(controller.handleMultipleSubmissions));
Router.patch("/start", tryCatch(controller.startExam));
Router.patch("/expire", tryCatch(controller.expireExam));

module.exports = Router;
