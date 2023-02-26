const { ClientError, ERR_MESSAGES } = require("../error");
const { extractAsstConfig } = require("../lib/assistant-config-wrap");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async register(params) {
    const applicant = await this.repository.findUser({ email: params.email });
    if (applicant) {
      throw new ClientError(ERR_MESSAGES.AUTH_USER_EXISTS);
    }
    const id = await this.repository.createUser(params);
    return {
      id,
      ...params,
    };
  }

  async login(params) {
    const { email, password } = params;
    const authErr = new ClientError(ERR_MESSAGES.AUTH_INVALID_CREDENTIALS);
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
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
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
    return this.repository.createAssistant({
      ...params,
      config: extractAsstConfig(params.config),
    });
  }

  async findAllAssistants() {
    return this.repository.findManyAssistants({});
  }

  async findAsstConfigByOrigin(origin) {
    const assistant = await this.repository.findAssistant({ origin });
    if (!assistant) {
      throw new ClientError(ERR_MESSAGES.NO_RECORD_FOUND);
    }
    return `const c=${assistant.config};export{c};`;
  }
}

module.exports = {
  Service,
};
