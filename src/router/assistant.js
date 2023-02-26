module.exports = {
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
