const ERR_TYPES = {
  CLIENT_ERR: "Client error",
  SERVER_ERR: "Server error",
};

const ERR_MESSAGES = {
  DB_CONNECTION_FAILED: "Database connection failed",
  DB_INTERNAL_ERR: "Internal database error",
  NO_RECORD_FOUND: "No record found",
  INVALID_ID: "Invalid id",
  AUTH_USER_EXISTS: "User with this email already exists",
  AUTH_INVALID_CREDENTIALS: "Email or/and password are not correct",
};

class CustomError extends Error {
  constructor(message, type = ERR_TYPES.SERVER_ERR) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
  }
}

class ServerError extends CustomError {
  constructor(message = ERR_MESSAGES.DB_INTERNAL_ERR) {
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
