const Fastify = require("fastify");
const auth = require("./auth");
const swagger = require("./swagger");

const createServer = (router, logger) => {
  const fastify = Fastify({ logger });
  fastify.register(auth);
  fastify.register(swagger);
  fastify.register(router);

  return fastify;
};

module.exports = {
  createServer,
};
