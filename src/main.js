require("dotenv").config();
const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("./auth"));

fastify.register(require("@fastify/multipart"), {
  attachFieldsToBody: "keyValues",
});

const path = require("path");

fastify.register(require("@fastify/static"), {
  root: path.join(process.cwd(), "/build"),
  prefix: "/", // optional: default '/'
});

const Repository = require("./repository").MongoDB;
const { Service } = require("./service");
const { Controller } = require("./controller");
const { defineRouterRegister } = require("./router");

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

fastify.addHook(
  "preHandler",
  controller.replaceAssistantConfig.bind(controller)
);

fastify.register(defineRouterRegister(controller));

const start = async () => {
  try {
    await repository.connect();
    await fastify.listen({ port: 3000 });
    console.log("Server is listenning on port 3000");
  } catch (err) {
    fastify.log.error(err);
    await repository.disconnect();
    process.exit(1);
  }
};
start();
