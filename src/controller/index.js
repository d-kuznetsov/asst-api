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

  async createOne(collection, req, reply) {
    try {
      const id = await this.service.createOne(collection, req.body);
      reply.send({ id });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findOneById(collection, req, reply) {
    try {
      const one = await this.service.findOneById(collection, req.params.id);
      reply.send(one);
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async updateOne(collection, req, reply) {
    try {
      await this.service.updateOne(collection, req.params.id, req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async deleteOneById(collection, req, reply) {
    try {
      await this.service.deleteOneById(collection, req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      this._handleError(err, reply);
    }
  }

  async findAll(collection, _, reply) {
    try {
      const items = await this.service.findAll(collection);
      reply.send(items);
    } catch (err) {
      this._handleError(err, reply);
    }
  }
}

module.exports = {
  Controller,
};
