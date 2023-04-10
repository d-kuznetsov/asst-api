const { STATUS_CODES } = require("http");
const { AppError } = require("../errors");

const createErrorReplyObj = (statusCode, message) => {
  const errObj = {
    statusCode,
    error: STATUS_CODES[400],
  };
  if (statusCode !== 500) {
    errObj.message = message;
  }
  return errObj;
};

module.exports = {
  createErrorReplyObj,
  AppError,
};
