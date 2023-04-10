module.exports = {
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

  findUserById: {
    method: "GET",
    url: "/user/:id",
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

  findAllUsers: {
    method: "GET",
    url: "/users",
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

  updateUser: {
    method: "PATCH",
    url: "/user",
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

  deleteUserById: {
    method: "DELETE",
    url: "/user/:id",
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
