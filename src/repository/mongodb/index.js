const { MongoDbBase, checkId } = require("./base");

class MongoDB extends MongoDbBase {
  constructor(logger) {
    super(logger);
  }

  async createOne(collection, params) {
    return this._createOne(collection, params);
  }

  async findOne(collection, params) {
    return this._findOne(collection, params);
  }

  async findOneById(collection, id) {
    checkId(id);
    return this._findOne(collection, { id });
  }

  async updateOne(collection, params) {
    checkId(params.id);
    return this._updateOne(collection, params);
  }

  async deleteOneById(collection, id) {
    checkId(id);
    await this._deleteOne(collection, { id });
  }

  async findMany(collection, query) {
    return this._findMany(collection, query);
  }
}

module.exports = MongoDB;
