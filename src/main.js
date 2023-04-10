require("dotenv").config();

const logger = require("./logger");
const Repository = require("./repository").MongoDB;
const { Service } = require("./service");
const { Controller } = require("./controller");
const { createRouter } = require("./router");
const { createServer } = require("./server");
const { initShutdown } = require("./shutdown");

const repository = new Repository(logger);
const service = new Service(repository, logger);
const controller = new Controller(service, logger);
const router = createRouter(controller);
const server = createServer(router, logger);

const handleError = initShutdown(
  server,
  repository,
  logger
)(1, "unexpected error");
controller.on("error", handleError);

const start = async () => {
  try {
    await repository.connect();
    await server.listen({ port: 3000 });
  } catch (err) {
    handleError(err);
  }
};
start();
