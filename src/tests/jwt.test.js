const { JWT } = require("../service/jwt");

describe("JWT", () => {
  const jwt = new JWT("secret_key");
  const payload = {
    name: "John Smith",
  };
  let token;

  test("sign", async () => {
    token = await jwt.sign(payload);
    expect(token).toBeTruthy();
  });

  test("verify", async () => {
    const { name } = await jwt.verify(token);
    expect(payload.name).toEqual(name);
  });
});
