const makeCreateOneRoute = (schema, controller) => {
  const collection = schema.title.toLowerCase();
  // eslint-disable-next-line
  const { id, ...fieldsWithoutId } = schema.fields;
  return {
    method: "POST",
    url: "/" + collection,
    schema: {
      body: {
        type: "object",
        required: schema.required,
        properties: fieldsWithoutId,
        additionalProperties: false,
      },
    },
    //ctrlMethod: "createOne",
    handler: controller["createOne"].bind(controller, collection),
  };
};

const makeFindOneRoute = (schema, controller) => {
  const collection = schema.title.toLowerCase();
  return {
    method: "GET",
    url: `/${collection}/:id`,
    schema: {
      params: {
        id: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: schema.fields,
        },
      },
    },
    ctrlMethod: "findOneById",
    handler: controller["findOneById"].bind(controller, collection),
  };
};

const makeUpdateOneRoute = (schema, controller) => {
  const collection = schema.title.toLowerCase();
  // eslint-disable-next-line
  const { id, ...fieldsWithoutId } = schema.fields;

  return {
    method: "PUT",
    url: `/${collection}/:id`,
    schema: {
      params: {
        id: { type: "string" },
      },
      body: {
        type: "object",
        properties: fieldsWithoutId,
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
    //ctrlMethod: "updateOneById",
    handler: controller["updateOne"].bind(controller, collection),
  };
};

const makeDeleteOneRoute = (schema, controller) => {
  const collection = schema.title.toLowerCase();
  return {
    method: "DELETE",
    url: `/${collection}/:id`,
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
    //ctrlMethod: "deleteOneById",
    handler: controller["deleteOneById"].bind(controller, collection),
  };
};

const makeFindAllRoute = (schema, controller) => {
  const collection = schema.title.toLowerCase();
  return {
    method: "GET",
    url: `/${collection}`,
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: schema.fields,
          },
        },
      },
    },
    handler: controller["findAll"].bind(controller, collection),
  };
};

const makeRegisterRoute = (controller) => {
  return {
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
    handler: controller["register"].bind(controller),
  };
};

const makeLoginRoute = (controller) => {
  return {
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
    handler: controller["login"].bind(controller),
  };
};

const buildRoutes = (schema, controller) => {
  const routes = [
    makeCreateOneRoute(schema, controller),
    makeFindOneRoute(schema, controller),
    makeUpdateOneRoute(schema, controller),
    makeDeleteOneRoute(schema, controller),
    makeFindAllRoute(schema, controller),
  ];
  return routes;
};

const buildAuthRoutes = (controller) => {
  const routes = [makeRegisterRoute(controller), makeLoginRoute(controller)];
  return routes;
};

module.exports = {
  buildRoutes,
  buildAuthRoutes,
};
