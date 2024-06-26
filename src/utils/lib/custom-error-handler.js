export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
    this.statusCode = 404;
  }
}

export class HandleCustomError extends CustomError {
  constructor(message) {
    super(message, 412);
    this.statusCode = 412;
  }
}
