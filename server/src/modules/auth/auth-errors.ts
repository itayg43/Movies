import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from "../../errors";

export class ConflictEmailError extends ConflictError {
  constructor() {
    super("Email address already in use");
  }
}

export class InvalidCredentialsError extends BadRequestError {
  constructor() {
    super("Invalid credentials");
  }
}

export class ExpiredRefreshTokenError extends UnauthorizedError {
  constructor() {
    super("Please provide an unexpired refresh token");
  }
}

export class InvalidRefreshTokenError extends UnauthorizedError {
  constructor() {
    super("Please provide a valid refresh token");
  }
}
