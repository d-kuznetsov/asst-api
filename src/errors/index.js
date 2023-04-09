class AppError extends Error {
  constructor(message, statusCode, cause = null) {
    super(message);
    this.statusCode = statusCode;
    if (cause) {
      this.cause = cause;
    }
  }
}

module.exports = {
  AppError,
};
