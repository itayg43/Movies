import { DtoMapper } from "../../dtos";

export class AuthDtoMapper extends DtoMapper {
  keys() {
    return ["id", "email", "createdAt"];
  }
}
