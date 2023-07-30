import { BadRequestError } from "../../errors";

export class EmailAddressAlreadyInUseError extends BadRequestError {
  constructor() {
    super("Email address already in use");
  }
}

export class InvalidCredentialsError extends BadRequestError {
  constructor() {
    super("Invalid credentials");
  }
}
