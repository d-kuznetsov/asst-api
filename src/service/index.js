const { ClientError } = require("../error");

class Service {
  constructor(repository, jwt) {
    this.repository = repository;
    this.jwt = jwt;
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
      // eslint-disable-next-line
      const { _id, ...restUserProps } = params;
      const token = await this.jwt.sign({
        id,
        ...restUserProps,
      });
      return token;
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
    const token = await this.jwt.sign(user);
    return token;
  }

  async checkAuth(token) {
    try {
      return await this.jwt.verify(token);
    } catch (err) {
      throw new ClientError("Authentication failed");
    }
  }
}

module.exports = {
  Service,
};
