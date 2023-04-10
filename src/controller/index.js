const { EventEmitter } = require("events");
const { createErrorReplyObj, AppError } = require("./utils");

class Controller extends EventEmitter {
  constructor(service, logger) {
    super();
    this.service = service;
    this.logger = logger;
  }

  _handleError(err, reply) {
    if (err instanceof AppError) {
      if (err.statusCode == 500) {
        this.logger.error(err);
      } else {
        this.logger.warn(err);
      }
      reply
        .code(err.statusCode)
        .send(createErrorReplyObj(err.statusCode, err.message));
      return;
    }
    reply.code(500).send(createErrorReplyObj(500));
    this.emit("error", err);
  }

  async register(req, reply) {
    try {
      const user = await this.service.register(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async login(req, reply) {
    try {
      const user = await this.service.login(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findUserById(req, reply) {
    try {
      const user = await this.service.findOneById("users", req.params.id);
      reply.send(user);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async updateUser(req, reply) {
    try {
      await this.service.updateOne("users", req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async deleteUserById(req, reply) {
    try {
      await this.service.deleteOneById("users", req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAllUsers(_, reply) {
    try {
      const users = await this.service.findAll("users");
      reply.send(users);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async createClient(req, reply) {
    try {
      const id = await this.service.createOne("clients", req.body);
      reply.send({ id });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findClientById(req, reply) {
    try {
      const client = await this.service.findOneById("clients", req.params.id);
      reply.send(client);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async updateClient(req, reply) {
    try {
      await this.service.updateOne("clients", req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async deleteClientById(req, reply) {
    try {
      await this.service.deleteOneById("clients", req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAllClients(_, reply) {
    try {
      const clients = await this.service.findAll("clients");
      reply.send(clients);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async createAssistant(req, reply) {
    try {
      const id = await this.service.createOne("assistants", req.body);
      reply.send({ id });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAssistantById(req, reply) {
    try {
      const assistant = await this.service.findOneById(
        "assistants",
        req.params.id
      );
      reply.send(assistant);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async updateAssistant(req, reply) {
    try {
      await this.service.updateOne("assistants", req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async deleteAssistantById(req, reply) {
    try {
      await this.service.deleteOneById("assistants", req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAllAssistants(_, reply) {
    try {
      const assistants = await this.service.findAll("assistants");
      reply.send(assistants);
    } catch (err) {
      this._handleError(err, reply);
    }
  }
}

module.exports = {
  Controller,
};
