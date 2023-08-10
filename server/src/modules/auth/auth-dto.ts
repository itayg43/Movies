import { DtoMapper } from "../../dtos";

export class UserDtoMapper extends DtoMapper {
  keys() {
    return ["id", "name", "email", "createdAt", "updatedAt"];
  }
}
