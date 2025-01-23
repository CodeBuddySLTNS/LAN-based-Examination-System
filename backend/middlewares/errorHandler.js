import { SERVER_ERROR } from "../constants/statusCodes";

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || SERVER_ERROR).send({
    status: error.statusCode || SERVER_ERROR,
    errorCode: error.errorCode,
    message: error.statusCode ? error.message : "Internal Server Error."
  });
  console.log(error);
};

module.exports = errorHandler;
