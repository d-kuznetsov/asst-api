const fastifyPlugin = require("fastify-plugin");
const fastifyJwt = require("@fastify/jwt");

module.exports = fastifyPlugin(async function (fastify) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET_KEY,
    sign: {
      expiresIn: process.env.EXPIRES_IN,
    },
  });

  fastify.decorate("authenticate", async function (req, reply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
