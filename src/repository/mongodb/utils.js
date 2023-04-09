const { ObjectId, MongoError } = require("mongodb");
const { AppError } = require("../../errors");

const checkId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new AppError("Invalid id", 400);
  }
  return true;
};

const adaptId = (params) => {
  let newParams;
  if (params.id) {
    const { id, ...restParams } = params;
    newParams = {
      _id: new ObjectId(id),
      ...restParams,
    };
  } else {
    newParams = {
      ...params,
    };
  }
  return newParams;
};

const handleMongoErr = (err, message) => {
  if (err instanceof MongoError) {
    throw new AppError(message, 500, err);
  } else {
    throw err;
  }
};

module.exports = {
  checkId,
  adaptId,
  handleMongoErr,
};
