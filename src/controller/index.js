const { handleError } = require("./error-handler");

class Controller {
  constructor(service) {
    this.service = service;
  }

  async register(req, reply) {
    try {
      const user = await this.service.register(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async login(req, reply) {
    try {
      const user = await this.service.login(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async createClient(req, reply) {
    try {
      const id = await this.service.createClient(req.body);
      reply.send({ id });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async findClientById(req, reply) {
    try {
      const client = await this.service.findClientById(req.params.id);
      reply.send(client);
    } catch (err) {
      handleError(err, reply);
    }
  }

  async updateClient(req, reply) {
    try {
      await this.service.updateClient(req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async deleteClientById(req, reply) {
    try {
      await this.service.deleteClientById(req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async findAllClients(_, reply) {
    try {
      const clients = await this.service.findAllClients();
      reply.send(clients);
    } catch (err) {
      handleError(err, reply);
    }
  }

  async createAssistant(req, reply) {
    try {
      const id = await this.service.createAssistant(req.body);
      reply.send({ id });
    } catch (err) {
      handleError(err, reply);
    }
  }

  async findAllAssistants(_, reply) {
    try {
      const assistants = await this.service.findAllAssistants();
      reply.send(assistants);
    } catch (err) {
      handleError(err, reply);
    }
  }
}

module.exports = {
  Controller,
};
