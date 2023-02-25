const { MongoClient, ObjectId } = require("mongodb");
const { ServerError, ClientError, ERR_MESSAGES } = require("../error");

const checkId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ClientError(ERR_MESSAGES.INVALID_ID);
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

class MongoDB {
  constructor(uri = "mongodb://localhost:27017/") {
    this.client = new MongoClient(uri);
  }

  async _insertOne(collection, document) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .insertOne(document);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    return result.insertedId.toString();
  }

  async _findOne(collection, query) {
    let internalQuery = adaptId(query);
    let result;

    try {
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .findOne(internalQuery);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
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
        .db("assistanst")
        .collection(collection)
        .updateOne({ _id }, { $set: updateParams });
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result.modifiedCount) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
  }

  async _deleteOne(collection, query) {
    let internalQuery = adaptId(query);
    let result;

    try {
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .deleteOne(internalQuery);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result.deletedCount) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
  }

  async _find(collection, query) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .find(query)
        .toArray();
    } catch (err) {
      console.error(err);
      throw new ServerError();
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
    } catch (err) {
      console.error(err);
      throw new ServerError(ERR_MESSAGES.CONNECTION_FAILED);
    }
  }

  async createClient(params) {
    return this._insertOne("clients", params);
  }

  async readClient(id) {
    checkId(id);
    return this._findOne("clients", { id });
  }

  async updateClient(params) {
    checkId(params.id);
    return this._updateOne("clients", params);
  }

  async deleteClient(id) {
    checkId(id);
    this._deleteOne("clients", { id });
  }

  async findClients(params = {}) {
    return this._find("clients", params);
  }

  async createUser(params) {
    return this._insertOne("users", params);
  }

  async findUser(params) {
    return this._findOne("users", params);
  }

  async createAssistant(params) {
    return this._insertOne("assistants", params);
  }

  async findAssistant(query) {
    return this._findOne("assistants", query);
  }

  async disconnect() {
    await this.client.close();
    console.log("Database connection closed");
  }
}

module.exports = MongoDB;
