import _ from "lodash";

export class DtoMapper {
  keys() {
    return ["id"];
  }

  map(model: any) {
    return _.pick(model, this.keys());
  }
}
