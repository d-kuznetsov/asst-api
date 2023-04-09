const { AppError } = require("../errors");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async register(params) {
    const applicant = await this.repository.findUser({ email: params.email });
    if (applicant) {
      throw new AppError("User already exists", 400);
    }
    const id = await this.repository.createUser(params);
    return {
      id,
      ...params,
    };
  }

  async login(params) {
    const { email, password } = params;
    const authErr = new AppError("Email or/and password are not correct", 400);
    const user = await this.repository.findUser({ email });
    if (!user) {
      throw authErr;
    }
    if (password !== user.password) {
      throw authErr;
    }
    return user;
  }

  async createClient(params) {
    return this.repository.createClient(params);
  }

  async findClientById(id) {
    const client = await this.repository.findClientById(id);
    if (!client) {
      throw new AppError("Client is not found", 404);
    }
    return client;
  }

  async updateClient(params) {
    return this.repository.updateClient(params);
  }

  async deleteClientById(id) {
    return this.repository.deleteClientById(id);
  }

  async findAllClients() {
    return this.repository.findManyClients({});
  }

  async createAssistant(params) {
    return this.repository.createAssistant(params);
  }

  async findAllAssistants() {
    return this.repository.findManyAssistants({});
  }
}

module.exports = {
  Service,
};
