const { MongoDbBase, checkId } = require("./base");

class MongoDB extends MongoDbBase {
  constructor(uri) {
    super(uri);
  }

  async createUser(params) {
    return this._createOne("users", params);
  }

  async findUser(params) {
    return this._findOne("users", params);
  }

  async createClient(params) {
    return this._createOne("clients", params);
  }

  async findClientById(id) {
    checkId(id);
    return this._findOne("clients", { id });
  }

  async updateClient(params) {
    checkId(params.id);
    return this._updateOne("clients", params);
  }

  async deleteClientById(id) {
    checkId(id);
    this._deleteOne("clients", { id });
  }

  async findClients(params = {}) {
    return this._findMany("clients", params);
  }

  async createAssistant(params) {
    return this._createOne("assistants", params);
  }

  async findAssistant(query) {
    return this._findOne("assistants", query);
  }

  async findAssistants(params = {}) {
    return this._findMany("assistants", params);
  }
}

module.exports = MongoDB;