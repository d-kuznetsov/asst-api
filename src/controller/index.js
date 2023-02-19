class Controller {
  constructor(service) {
    this.service = service;
  }
  async readClient(req, reply) {
    reply.send("plain string");
  }
}

module.exports = {
  Controller,
};
