const { MongoClient } = require("mongodb");

class MongoDB {
  constructor(uri = "mongodb://localhost:27017/") {
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db("assistants").command({ ping: 1 });
      console.log("MongoDB: connected successfully to server");
    } finally {
      await this.client.close();
    }
  }
}

module.exports = MongoDB;
