require("dotenv").config();

const Repository = require("./repository").MongoDB;
const { Service } = require("./service");
const { Controller } = require("./controller");
const { createRouter } = require("./router");
const { createServer } = require("./server");
const { initShutdown } = require("./shutdown");

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);
const router = createRouter(controller);
const server = createServer(router);

const createShutdownHandler = initShutdown(server, repository);
controller.on("error", createShutdownHandler(1, "unexpected error"));

//new Promise((_, reject) => setTimeout(reject, 5000, new Error("Test")));

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
