class RepositoryError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class RepositiryClientError extends RepositoryError {
  constructor(message) {
    super(message);
  }
}

class RepositiryServerError extends RepositoryError {
  constructor(message = "Internal database error") {
    super(message);
  }
}
/* 
function test() {
  throw new RepositiryClientError("Some error");
}

function run() {
  test();
}

run(); */

module.exports = {
  RepositoryError,
  RepositiryClientError,
  RepositiryServerError,
};
