const { buildRoutes, buildAuthRoutes } = require("./utils");
const schemas = require("../schemas");

const createRouter = (controller) => {
  const routes = schemas.reduce((routes, schema) => {
    return [...routes, ...buildRoutes(schema, controller)];
  }, buildAuthRoutes(controller));

  return (fastify, _, done) => {
    routes.forEach((route) => {
      fastify.route(route);
    });
    done();
  };
};

module.exports = {
  createRouter,
};
