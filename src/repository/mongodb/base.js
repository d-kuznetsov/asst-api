const { MongoClient } = require("mongodb");
const { AppError } = require("../../errors");
const { checkId, adaptId, handleMongoErr } = require("./utils");

class MongoDbBase {
  constructor(logger) {
    this.logger = logger;
    this.client = new MongoClient(process.env.MONGO_URL);
  }

  async _createOne(collection, document) {
    let result;
    try {
      result = await this.client
        .db(process.env.DATABASE)
        .collection(collection)
        .insertOne(document);
    } catch (err) {
      handleMongoErr(
        err,
        `Document failed to create in ${collection} collection`
      );
    }
    return result.insertedId.toString();
  }

  async _findOne(collection, query) {
    let internalQuery = adaptId(query);
    let result;

    try {
      result = await this.client
        .db(process.env.DATABASE)
        .collection(collection)
        .findOne(internalQuery);
    } catch (err) {
      handleMongoErr(
        err,
        `Document failed to find in ${collection} collection`
      );
    }
    if (!result) {
      return null;
    }

    const { _id, ...restProps } = result;
    return {
      id: _id.toString(),
      ...restProps,
    };
  }

  async _updateOne(collection, query) {
    let internalQuery = adaptId(query);
    let result;

    try {
      const { _id, ...updateParams } = internalQuery;
      result = await this.client
        .db(process.env.DATABASE)
        .collection(collection)
        .updateOne({ _id }, { $set: updateParams });
    } catch (err) {
      handleMongoErr(
        err,
        `Document failed to update in ${collection} collection`
      );
    }
    if (!result.modifiedCount) {
      throw new AppError(
        `Document is not found in ${collection} collection`,
        404
      );
    }
  }

  async _deleteOne(collection, query) {
    let internalQuery = adaptId(query);
    let result;

    try {
      result = await this.client
        .db(process.env.DATABASE)
        .collection(collection)
        .deleteOne(internalQuery);
    } catch (err) {
      handleMongoErr(
        err,
        `Document failed to delete in ${collection} collection`
      );
    }
    if (!result.deletedCount) {
      throw new AppError(
        `Document is not found in ${collection} collection`,
        404
      );
    }
  }

  async _findMany(collection, filter, query) {
    let result;
    const { page = 1, limit = 20 } = query;
    try {
      result = await this.client
        .db(process.env.DATABASE)
        .collection(collection)
        .find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .toArray();
    } catch (err) {
      handleMongoErr(
        err,
        `Documents failed to find in ${collection} collection`
      );
    }

    return result.map(({ _id, ...restProps }) => {
      return {
        id: _id.toString(),
        ...restProps,
      };
    });
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db("assistants").command({ ping: 1 });
      this.logger.info("Database connection open");
    } catch (err) {
      handleMongoErr(err);
    }
  }

  async disconnect() {
    await this.client.close();
    this.logger.info("Database connection closed");
  }
}

module.exports = {
  MongoDbBase,
  checkId,
  adaptId,
};
