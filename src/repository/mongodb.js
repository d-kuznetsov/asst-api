const { MongoClient, ObjectId } = require("mongodb");
const { RepositiryClientError, RepositiryServerError } = require("./error");

class MongoDB {
  constructor(uri = "mongodb://localhost:27017/") {
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db("assistants").command({ ping: 1 });
    } catch (err) {
      throw new RepositiryServerError("Databese connection failed");
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
      throw new RepositiryServerError();
    }
    return result.insertedId;
  }

  async readClient(clientId) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .findOne({ _id: new ObjectId(clientId) });
    } catch (err) {
      console.error(err);
      throw new RepositiryServerError();
    }
    if (!result) {
      throw RepositiryClientError("No record found with given id");
    }
    return result;
  }

  async updateClient(params) {
    let result;
    try {
      const { id: clientId, ...restParams } = params;
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .updateOne({ _id: new ObjectId(clientId) }, { $set: restParams });
    } catch (err) {
      console.error(err);
      throw RepositiryServerError();
    }
    if (!result.modifiedCount) {
      throw RepositiryClientError("No record found with given id");
    }
  }

  async deleteClient(clientId) {
    let result;
    try {
      result = await this.client
        .db("assistanst")
        .collection("clients")
        .deleteOne({ _id: new ObjectId(clientId) });
    } catch (err) {
      console.error(err);
      throw RepositiryServerError();
    }
    if (!result.deletedCount) {
      throw RepositiryClientError("No record found with given id");
    }
  }

  async disconnect() {
    await this.client.close();
    console.log("Database connection closed");
  }
}

module.exports = MongoDB;
