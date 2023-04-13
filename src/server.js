const Fastify = require("fastify");
const auth = require("./auth");
const swagger = require("./swagger");
const cors = require("./cors");

const createServer = (router, logger) => {
  const fastify = Fastify({ logger });
  fastify.register(auth);
  fastify.register(swagger);
  fastify.register(cors);
  fastify.register(router);

  return fastify;
};

module.exports = {
  createServer,
};
