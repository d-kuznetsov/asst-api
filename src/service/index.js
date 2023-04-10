const { AppError } = require("../errors");

class Service {
  constructor(repository, logger) {
    this.repository = repository;
    this.logger = logger;
  }

  async register(params) {
    const applicant = await this.repository.findOne("users", {
      email: params.email,
    });
    if (applicant) {
      throw new AppError("User already exists", 400);
    }
    const id = await this.repository.createOne("users", params);
    return {
      id,
      ...params,
    };
  }

  async login(params) {
    const { email, password } = params;
    const authErr = new AppError("Email or/and password are not correct", 400);
    const user = await this.repository.findOne("users", { email });
    if (!user) {
      throw authErr;
    }
    if (password !== user.password) {
      throw authErr;
    }
    return user;
  }

  async createOne(collection, params) {
    return this.repository.createOne(collection, params);
  }

  async findOneById(collection, id) {
    const one = await this.repository.findOneById(collection, id);
    if (!one) {
      throw new AppError("Client is not found", 404);
    }
    return one;
  }

  async updateOne(collection, params) {
    return this.repository.updateOne(collection, params);
  }

  async deleteOneById(collection, id) {
    return this.repository.deleteOneById(collection, id);
  }

  async findAll(collection) {
    return this.repository.findMany(collection, {});
  }
}

module.exports = {
  Service,
};
