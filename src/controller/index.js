const { EventEmitter } = require("events");
const { createErrorReplyObj, AppError } = require("./error-handler");

class Controller extends EventEmitter {
  constructor(service) {
    super();
    this.service = service;
  }

  _handleError(err, reply) {
    if (err instanceof AppError) {
      if (err.statusCode == 500) {
        console.error(err);
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

  async createClient(req, reply) {
    try {
      const id = await this.service.createClient(req.body);
      reply.send({ id });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findClientById(req, reply) {
    try {
      const client = await this.service.findClientById(req.params.id);
      reply.send(client);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async updateClient(req, reply) {
    try {
      await this.service.updateClient(req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async deleteClientById(req, reply) {
    try {
      await this.service.deleteClientById(req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAllClients(_, reply) {
    try {
      const clients = await this.service.findAllClients();
      reply.send(clients);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async createAssistant(req, reply) {
    try {
      const id = await this.service.createAssistant(req.body);
      reply.send({ id });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAllAssistants(_, reply) {
    try {
      const assistants = await this.service.findAllAssistants();
      reply.send(assistants);
    } catch (err) {
      this._handleError(err, reply);
    }
  }
}

module.exports = {
  Controller,
};
