const authRoutes = require("./user");
const clientRoutes = require("./client");
const assistantRoutes = require("./assistant");

const protectedRoutes = {
  ...clientRoutes,
  ...assistantRoutes,
};

const defineRouterRegister = (controller) => {
  return (fastify, _, done) => {
    Object.keys(protectedRoutes).forEach((key) => {
      fastify.route({
        ...protectedRoutes[key],
        onRequest: [fastify.authenticate],
        handler: controller[key].bind(controller),
      });
    });

    Object.keys(authRoutes).forEach((key) => {
      fastify.route({
        ...authRoutes[key],
        handler: controller[key].bind(controller),
      });
    });

    done();
  };
};

module.exports = {
  defineRouterRegister,
};
