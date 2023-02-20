const routeOptions = {
  createClient: {
    method: "POST",
    url: "/client",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
        },
        required: ["name", "email"],
      },
      response: {
        200: {
          type: "string",
        },
      },
    },
  },
  readClient: {
    method: "GET",
    url: "/client/:id",
    schema: {
      params: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },
      },
    },
  },
  updateClient: {
    method: "PATCH",
    url: "/client",
    schema: {
      body: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
          },
        },
      },
    },
  },
  deleteClient: {
    method: "DELETE",
    url: "/client/:id",
    schema: {
      params: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
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
