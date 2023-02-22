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
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .insertOne(params);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    return result.insertedId.toString();
  }

  async readClient(clientId) {
    checkId(clientId);

    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .findOne({ _id: new ObjectId(clientId) });
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

  async updateClient(params) {
    checkId(params.id);

    let result;
    try {
      const { id: clientId, ...restParams } = params;
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .updateOne({ _id: new ObjectId(clientId) }, { $set: restParams });
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    if (!result.modifiedCount) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
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

  async createUser(params) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("users")
        .insertOne(params);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    return result.insertedId.toString();
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
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("assistants")
        .insertOne(params);
    } catch (err) {
      console.error(err);
      throw new ServerError();
    }
    return result.insertedId.toString();
  }

  async disconnect() {
    await this.client.close();
    console.log("Database connection closed");
  }
}

module.exports = MongoDB;
