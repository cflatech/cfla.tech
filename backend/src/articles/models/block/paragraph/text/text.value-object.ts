import { BlockInterface } from "../../block-content.interface";

export class Link implements BlockInterface {
  readonly type = "text";

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
