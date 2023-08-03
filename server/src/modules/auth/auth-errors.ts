import { BadRequestError, ConflictError } from "../../errors";

export class EmailAddressAlreadyInUseError extends ConflictError {
  constructor() {
    super("Email address already in use");
  }
}

export class InvalidCredentialsError extends BadRequestError {
  constructor() {
    super("Invalid credentials");
  }
}
