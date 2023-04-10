module.exports = {
  createAssistant: {
    method: "POST",
    url: "/assistant",
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

  findAssistantById: {
    method: "GET",
    url: "/assistant/:id",
    schema: {
      params: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            config: { type: "string" },
          },
        },
      },
    },
  },

  updateAssistant: {
    method: "PATCH",
    url: "/assistant",
    schema: {
      body: {
        type: "object",
        properties: {
          id: { type: "string" },
          config: { type: "string" },
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

  deleteAssistantById: {
    method: "DELETE",
    url: "/assistant/:id",
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
