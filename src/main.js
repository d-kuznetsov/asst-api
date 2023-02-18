const Repositiry = require("./repository").MongoDB;

const run = async () => {
  const repository = new Repositiry();
  await repository.connect();
};

run();
