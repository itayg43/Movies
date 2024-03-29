import { statusCode } from "../constants";

class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(statusCode.badRequest, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(statusCode.unauthorized, message);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(statusCode.conflict, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(statusCode.notFound, message);
  }
}
