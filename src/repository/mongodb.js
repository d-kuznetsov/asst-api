const { MongoClient } = require("mongodb");

class MongoDB {
  constructor(uri = "mongodb://localhost:27017/") {
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db("assistants").command({ ping: 1 });
      console.log("Repository: connected successfully to databese server");
    } catch (err) {
      throw Error("Repository: connection to database server failed");
    }
  }

  async createClient(params) {
    const result = await this.client
      .db("assistanst")
      .collection("clients")
      .insertOne(params);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  }

  async disconnect() {
    await this.client.disconnect();
  }
}

module.exports = MongoDB;
