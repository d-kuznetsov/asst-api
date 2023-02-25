const protectedRouteOptions = {
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

  findClientById: {
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

  findAllClients: {
    method: "GET",
    url: "/clients",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
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

  deleteClientById: {
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

  createAssistant: {
    method: "POST",
    url: "/upload",
    schema: {
      body: {
        type: "object",
        required: ["config"],
        properties: {
          config: {
            type: "string",
          },
        },
      },
    },
  },

  findAllAssistants: {
    method: "GET",
    url: "/assistants",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              config: { type: "string" },
              origin: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const loginRegisterRouteOptions = {
  register: {
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
            token: { type: "string" },
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
            token: { type: "string" },
          },
        },
      },
    },
  },
};

const defineRouterRegister = (controller) => {
  return (fastify, _, done) => {
    Object.keys(protectedRouteOptions).forEach((key) => {
      fastify.route({
        ...protectedRouteOptions[key],
        onRequest: [fastify.authenticate],
        handler: controller[key].bind(controller),
      });
    });

    Object.keys(loginRegisterRouteOptions).forEach((key) => {
      fastify.route({
        ...loginRegisterRouteOptions[key],
        handler: controller[key].bind(controller),
      });
    });

    done();
  };
};

module.exports = {
  defineRouterRegister,
};
