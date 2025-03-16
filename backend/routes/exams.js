const express = require("express");
const { tryCatch } = require("../utils/tryCatch");
const controller = require("../controllers/exams");
const Router = express.Router();

Router.get("/", tryCatch(controller.exams));

module.exports = Router;
