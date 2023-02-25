const { ClientError } = require("../error");
const { extractAsstConfig } = require("../lib/assistant-config-wrap");

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async createClient(params) {
    return await this.repository.createClient(params);
  }

  async findClientById(id) {
    return await this.repository.findClientById(id);
  }

  async updateClient(params) {
    await this.repository.updateClient(params);
  }

  async deleteClientById(id) {
    await this.repository.deleteClientById(id);
  }

  async readAllClients() {
    return this.repository.findClients({});
  }

  async registerUser(params) {
    try {
      await this.repository.findUser({ email: params.email });
    } catch (err) {
      if (!(err instanceof ClientError)) {
        throw err;
      }
      const id = await this.repository.createUser(params);
      // eslint-disable-next-line
      const { _id, ...restUserProps } = params;
      return {
        id,
        ...restUserProps,
      };
    }
    throw new ClientError("A user with this email already exists");
  }

  async login(params) {
    const { email, password } = params;
    const authErr = new ClientError("Email or/and password are not correct");
    let user;

    try {
      user = await this.repository.findUser({ email });
    } catch (err) {
      if (err instanceof ClientError) {
        throw authErr;
      }
      throw err;
    }
    if (user.password !== password) {
      throw authErr;
    }
    return user;
  }

  async createAssistant(params) {
    return await this.repository.createAssistant({
      ...params,
      config: extractAsstConfig(params.config),
    });
  }

  async findAsstConfigByOrigin(origin) {
    const { config } = await this.repository.findAssistant({ origin });
    return `const c=${config};export{c};`;
  }
}

module.exports = {
  Service,
};
