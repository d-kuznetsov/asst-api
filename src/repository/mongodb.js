const { MongoClient, ObjectId } = require("mongodb");
const { ServerError, ClientError, ERR_MESSAGES } = require("../error");

const checkId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new ClientError(ERR_MESSAGES.INVALID_ID);
  }
  return true;
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
    let modifiedQuery;
    if (query.id) {
      const { id, ...restProps } = query;
      modifiedQuery = {
        _id: new ObjectId(id),
        ...restProps,
      };
    } else {
      modifiedQuery = {
        ...query,
      };
    }

    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .findOne(modifiedQuery);
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

  async _updateOne(collection, params) {
    let result;
    try {
      const { id, ...updateParams } = params;
      result = await this.client
        .db("assistanst")
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) }, { $set: updateParams });
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result.modifiedCount) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
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

  async deleteClient(clientId) {
    checkId(clientId);

    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .deleteOne({ _id: new ObjectId(clientId) });
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result.deletedCount) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
  }

  async findClients(params = {}) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .find()
        .toArray(params);
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

  async createUser(params) {
    return this._insertOne("users", params);
  }

  async findUser(params) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("users")
        .findOne(params);
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
