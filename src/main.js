require("dotenv").config();

const path = require("path");
const fastify = require("fastify");
const fastifyMultipart = require("@fastify/multipart");
const fastifyStatic = require("@fastify/static");

const server = fastify({
  logger: {
    level: "warn",
  },
});

server.register(require("./auth"));

server.register(fastifyMultipart, {
  attachFieldsToBody: "keyValues",
});
server.register(fastifyStatic, {
  root: path.join(process.cwd(), "/build"),
  prefix: "/", // optional: default '/'
});

const Repository = require("./repository").MongoDB;
const { Service } = require("./service");
const { Controller } = require("./controller");
const { createRouter } = require("./router");

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
const router = createRouter(controller);

server.register(router);
server.addHook(
  "preHandler",
  controller.replaceAssistantConfig.bind(controller)
);

const start = async () => {
  try {
    await repository.connect();
    await server.listen({ port: 3000 });
    console.log("Server is listenning on port 3000");
  } catch (err) {
    server.log.error(err);
    await repository.disconnect();
    process.exit(1);
  }
};
start();
