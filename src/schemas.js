const userSchema = {
  title: "users",
  fields: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "name", "password"],
};

const clientSchema = {
  title: "clients",
  fields: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
  required: ["email", "name"],
};

const assistantSchema = {
  title: "assistants",
  fields: {
    id: {
      type: "string",
    },
    config: {
      type: "string",
    },
  },
  required: ["config"],
};

module.exports = [userSchema, clientSchema, assistantSchema];
