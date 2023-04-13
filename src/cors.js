const fstPlugin = require("fastify-plugin");
const fstCors = require("@fastify/cors");

module.exports = fstPlugin(async function (fastify) {
  fastify.register(fstCors, {
    origin: process.env.NODE_ENV === "development" ? "*" : "*",
  });
});
