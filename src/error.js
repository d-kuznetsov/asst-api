const ERR_TYPES = {
  CLIENT_ERR: "Client error",
  SERVER_ERR: "Server error",
};

const ERR_MESSAGES = {
  CONNECTION_FAILED: "Database connection failed",
  INTERNAL_DB_ERR: "Internal database error",
  NO_RECORD_FOUND: "No record found",
};

class CustomError extends Error {
  constructor(message, type = ERR_TYPES.SERVER_ERR) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
  }
}

class ServerError extends CustomError {
  constructor(message = ERR_MESSAGES.INTERNAL_DB_ERR) {
    super(message);
    this.type = ERR_TYPES.SERVER_ERR;
  }
}

class ClientError extends CustomError {
  constructor(message) {
    super(message);
    this.type = ERR_TYPES.CLIENT_ERR;
  }
}

module.exports = {
  CustomError,
  ClientError,
  ServerError,
  ERR_MESSAGES,
  ERR_TYPES,
};
