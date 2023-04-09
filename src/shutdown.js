const shutdown = (err) => {
  if (err) {
    console.error(err);
  }
  process.exit(1);
};

const initShutdown = () => {
  process.on("unhandledRejection", shutdown);
  process.on("uncaughtException", shutdown);
};

module.exports = {
  shutdown,
  initShutdown,
};
