import { InvalidArgumentException } from "../../../exceptions/invalidArgument.exception";

export class Id {
  readonly value: string;

  constructor(id: string) {
    if (this.isUuid(id)) {
      throw new InvalidArgumentException();
    }
    this.value = id;
  }

  private isUuid(id: string): boolean {
    return !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      id,
    );
  }
}
