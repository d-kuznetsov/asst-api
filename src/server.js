const Fastify = require("fastify");
const fastifyMultipart = require("@fastify/multipart");
const authPlugin = require("./auth");

const createServer = (router) => {
  const fastify = Fastify({
    logger: {
      level: "warn",
    },
  });
  fastify.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues",
  });
  fastify.register(authPlugin);
  fastify.register(router);

  return fastify;
};

module.exports = {
  createServer,
};
