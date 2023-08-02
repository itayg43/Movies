import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from "../../errors";

export class EmailAddressAlreadyInUseError extends ConflictError {
  constructor() {
    super("Email address already in use");
  }
}

export class InvalidRefreshTokenError extends UnauthorizedError {
  constructor() {
    super("Invalid refresh token");
  }
}

export class ExpiredRefreshTokenError extends UnauthorizedError {
  constructor() {
    super("Refresh token was expired");
  }
}

export class InvalidCredentialsError extends BadRequestError {
  constructor() {
    super("Invalid credentials");
  }
}
