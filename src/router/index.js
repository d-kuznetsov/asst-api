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
        additionalProperties: false,
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
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
        additionalProperties: false,
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

  registerUser: {
    method: "POST",
    url: "/register",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["name", "email", "password"],
        additionalProperties: false,
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
  },

  login: {
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
        additionalProperties: false,
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
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
