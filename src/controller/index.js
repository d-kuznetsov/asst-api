class Controller {
  constructor(service) {
    this.service = service;
  }
  async readClient(req, reply) {
    try {
      const client = await this.service.readClient(req.params.id);
      reply.send(client);
    } catch (err) {
      console.error(err);
      reply.code(500).send(err);
    }
  }
}

module.exports = {
  Controller,
};
