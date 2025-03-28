class CustomError extends Error {
  constructor(message, statusCode, body) {
    super(message);
    this.statusCode = statusCode;
    this.body = body || null;
  }
}

module.exports = CustomError;
