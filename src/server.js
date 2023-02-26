const path = require("path");

const fastify = require("fastify");
const fastifyMultipart = require("@fastify/multipart");
const fastifyStatic = require("@fastify/static");

const authPlugin = require("./auth");

const createServer = (fastifyOpts, router) => {
  const server = fastify(fastifyOpts);

  server.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues",
  });
  server.register(fastifyStatic, {
    root: path.join(process.cwd(), "/build"),
    prefix: "/", // optional: default '/'
  });
  server.register(authPlugin);
  server.register(router);

  return server;
};

module.exports = createServer;
