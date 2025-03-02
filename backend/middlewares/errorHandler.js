const { SERVER_ERROR } = require("../constants/statusCodes");

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || SERVER_ERROR).json({
    status: error.statusCode || SERVER_ERROR,
    errorCode: error.errorCode,
    body: error.body,
    message: error.statusCode ? error.message : "Internal Server Error.",
  });
  console.log(error);
};

module.exports = errorHandler;
