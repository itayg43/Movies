import { DtoMapper } from "../../dtos";

export class UserDtoMapper extends DtoMapper {
  keys() {
    return ["id", "email", "createdAt", "updatedAt"];
  }
}
