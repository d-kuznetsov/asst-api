const { STATUS_CODES } = require("http");

const { ClientError } = require("../error");

class Controller {
  constructor(service) {
    this.service = service;
  }
  async readClient(req, reply) {
    try {
      const client = await this.service.readClient(req.params.id);
      reply.send(client);
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(STATUS_CODES[400]);
        return;
      }
      console.error(err);
      reply.code(500).send(STATUS_CODES[500]);
    }
  }
}

module.exports = {
  Controller,
};
