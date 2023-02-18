const Repositiry = require("./repository").MongoDB;

const run = async () => {
  const repository = new Repositiry();
  await repository.connect();
  const client = { name: "A GmbH", email: "a.gmbh@example.com" };
  await repository.createClient(client);
  await repository.disconnect();
};

run();
