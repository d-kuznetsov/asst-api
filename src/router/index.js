const routeOptions = {
  readClient: {
    method: "GET",
    url: "/client/:id",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
      },
    },
  },
};

const defineRouterRegister = (controller) => {
  return (fastify, _, done) => {
    Object.keys(routeOptions).forEach((key) => {
      fastify.route({
        ...routeOptions[key],
        handler: controller[key].bind(controller),
      });
    });
    done();
  };
};

module.exports = {
  defineRouterRegister,
};
