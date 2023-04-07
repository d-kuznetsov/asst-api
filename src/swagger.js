const fastifyPlugin = require("fastify-plugin");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(swagger);
  fastify.register(swaggerUI, {
    routePrefix: "/docs",
    /*     swagger: {
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    }, */
  });
});
