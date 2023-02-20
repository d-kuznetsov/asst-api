const { ClientError } = require("../error");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async createClient(params) {
    return await this.repository.createClient(params);
  }

  async readClient(id) {
    return await this.repository.readClient(id);
  }

  async updateClient(params) {
    await this.repository.updateClient(params);
  }

  async deleteClient(id) {
    await this.repository.deleteClient(id);
  }

  async registerUser(params) {
    try {
      await this.repository.findUser({ email: params.email });
    } catch (err) {
      if (!(err instanceof ClientError)) {
        throw err;
      }
      const id = await this.repository.createUser(params);
      return {
        id,
        ...params,
      };
    }
    throw new ClientError("A user with this email already exists");
  }
}

module.exports = {
  Service,
};
