const initShutdown = (server, repository, logger) => {
  const createShutdownHandler = (code, reason) => {
    return async (value) => {
      logger.info(`Server closing by ${reason}`);
      if (code) {
        logger.error(value);
      }
      setTimeout(() => {
        logger.warn(`Server failed to gracefully close before timeout`);
        process.exit(1);
      }, process.env.CLOSE_TIMEOUT || 3000).unref();

      await server.close();
      await repository.disconnect();
      logger.info("Server gracefully closed");
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
};

module.exports = {
  initShutdown,
};
