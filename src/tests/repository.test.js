const Repositiry = require("../repository").MongoDB;
const { ERR_MESSAGES } = require("../error");

describe("client", () => {
  const repository = new Repositiry();
  const mockClient = {
    name: "John Smith",
    email: "smith@gmail.com",
  };
  let clientId;

  const mockUser = {
    name: "John Smith",
    email: "smith@gmail.com",
    password: "12345678",
  };
  let userId;

  beforeAll(async () => {
    await repository.connect();
  });

  test("create client", async () => {
    clientId = await repository.createClient({ ...mockClient });
    expect(clientId).toBeTruthy();
  });

  test("read client", async () => {
    const createdClient = await repository.findClientById(clientId);
    expect(createdClient).toEqual({ id: clientId, ...mockClient });
  });

  test("update client", async () => {
    const newEmail = "john.smith@gmail.com";
    await repository.updateClient({
      id: clientId,
      email: newEmail,
    });
    const client = await repository.findClientById(clientId);
    expect(client.email).toEqual(newEmail);
  });

  test("delete client", async () => {
    expect.assertions(1);
    try {
      await repository.deleteClient(clientId);
      await repository.findClientById(clientId);
    } catch (err) {
      expect(err.message).toMatch(ERR_MESSAGES.NO_RECORD_FOUND);
    }
  });

  test("create user", async () => {
    userId = await repository.createUser({ ...mockUser });
    expect(userId).toBeTruthy();
  });

  test("find user", async () => {
    const createdUser = await repository.findUser({ email: mockUser.email });
    expect(createdUser).toEqual({ id: userId, ...mockUser });
  });

  afterAll(async () => {
    await repository.disconnect();
  });
});
