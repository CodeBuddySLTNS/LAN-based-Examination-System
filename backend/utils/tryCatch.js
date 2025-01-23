const { Request } = require("express");

module.exports.tryCatch =
  (controller) => async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
