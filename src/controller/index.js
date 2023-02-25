const { STATUS_CODES } = require("http");

const { ClientError } = require("../error");

const createErrObj = (statusCode, message) => {
  const errObj = {
    statusCode,
    error: STATUS_CODES[400],
  };
  if (statusCode !== 500) {
    errObj.message = message;
  }
  return errObj;
};

class Controller {
  constructor(service) {
    this.service = service;
  }

  async register(req, reply) {
    try {
      const user = await this.service.register(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async login(req, reply) {
    try {
      const user = await this.service.login(req.body);
      const token = await reply.jwtSign(user);
      reply.send({ token });
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async createClient(req, reply) {
    try {
      const id = await this.service.createClient(req.body);
      reply.send({ id });
    } catch (err) {
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async findClientById(req, reply) {
    try {
      const client = await this.service.findClientById(req.params.id);
      reply.send(client);
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async updateClient(req, reply) {
    try {
      await this.service.updateClient(req.body);
      reply.send({ status: "Ok" });
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async deleteClientById(req, reply) {
    try {
      await this.service.deleteClientById(req.params.id);
      reply.send({ status: "Ok" });
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async readAllClients(_, reply) {
    try {
      const clients = await this.service.readAllClients();
      reply.send(clients);
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async createAssistant(req, reply) {
    try {
      const id = await this.service.createAssistant(req.body);
      reply.send({ id });
    } catch (err) {
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }

  async replaceAssistantConfig(req, reply) {
    if (req.url.includes("assistant-config")) {
      const { origin } = req.headers;
      const config = await this.service.findAsstConfigByOrigin(origin);
      reply.header("Content-Type", "application/javascript; charset=UTF-8");
      reply.send(config);
      return reply;
    }
  }

  async findManyAssistants(_, reply) {
    try {
      const assistants = await this.service.findManyAssistants();
      reply.send(assistants);
    } catch (err) {
      if (err instanceof ClientError) {
        reply.code(400).send(createErrObj(400, err.message));
        return;
      }
      console.error(err);
      reply.code(500).send(createErrObj(500));
    }
  }
}

module.exports = {
  Controller,
};
