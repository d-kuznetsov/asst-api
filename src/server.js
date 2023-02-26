const path = require("path");

const fastifyMultipart = require("@fastify/multipart");
const fastifyStatic = require("@fastify/static");

const authPlugin = require("./auth");

const createServer = (fastify, router) => {
  fastify.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues",
  });
  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "/build"),
    prefix: "/", // optional: default '/'
  });
  fastify.register(authPlugin);
  fastify.register(router);

  return fastify;
};

module.exports = createServer;
