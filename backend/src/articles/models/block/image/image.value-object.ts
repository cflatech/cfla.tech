import { BlockInterface } from "../block.interface";

export class Image implements BlockInterface {
  readonly type = "image";

  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }
}
