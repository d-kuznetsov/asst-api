const Fastify = require("fastify");
const fstMultipart = require("@fastify/multipart");
const auth = require("./auth");
const swagger = require("./swagger");

const createServer = (router, logger) => {
  const fastify = Fastify({ logger });
  fastify.register(fstMultipart, {
    attachFieldsToBody: "keyValues",
  });
  fastify.register(auth);
  fastify.register(swagger);
  fastify.register(router);

  return fastify;
};

module.exports = {
  createServer,
};
