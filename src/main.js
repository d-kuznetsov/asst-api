const fastify = require("fastify")({
  logger: false,
});

const Repository = require("./repository").MongoDB;
const { Service } = require("./service");
const { Controller } = require("./controller");
const { defineRouterRegister } = require("./router");

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

fastify.register(defineRouterRegister(controller));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
