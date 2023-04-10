const TIMEOUT = 3000;

function initShutdown(server, repository) {
  const createShutdownHandler = (code, reason) => {
    return async (value) => {
      console.log(`\nServer closing by ${reason}`);
      if (code) {
        console.error(value);
      }
      setTimeout(() => {
        console.warn(`Server failed to gracefully close before timeout`);
        process.exit(1);
      }, TIMEOUT).unref();

      await server.close();
      await repository.disconnect();
      console.log("Server gracefully closed");
      process.exit(code);
    };
  };

  process.on(
    "uncaughtException",
    createShutdownHandler(1, "uncaught exception")
  );
  process.on(
    "unhandledRejection",
    createShutdownHandler(1, "unhandled rejection")
  );
  process.on("SIGTERM", createShutdownHandler(0, "SIGTERM"));
  process.on("SIGINT", createShutdownHandler(0, "SIGINT"));
  process.on("SIGUSR2", createShutdownHandler(0, "SIGUSR2"));

  return createShutdownHandler;
}

module.exports = {
  initShutdown,
};
