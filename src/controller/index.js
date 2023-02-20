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

  async _checkAuth(req) {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      return await this.service.checkAuth(token);
    } else {
      throw new ClientError("Authentication failed");
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

  async readClient(req, reply) {
    try {
      await this._checkAuth(req);
      const client = await this.service.readClient(req.params.id);
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

  async deleteClient(req, reply) {
    try {
      await this.service.deleteClient(req.params.id);
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

  async registerUser(req, reply) {
    try {
      const token = await this.service.registerUser(req.body);
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
      const token = await this.service.login(req.body);
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
}

module.exports = {
  Controller,
};
