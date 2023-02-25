const { STATUS_CODES } = require("http");
const { ClientError } = require("../error");

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

const handleError = (err, reply) => {
  if (err instanceof ClientError) {
    reply.code(400).send(createErrorReplyObj(400, err.message));
    return;
  }
  console.error(err);
  reply.code(500).send(createErrorReplyObj(500));
};

module.exports = {
  handleError,
};
