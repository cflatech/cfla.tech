import { BlockInterface } from "../block-content.interface";

export class Header implements BlockInterface {
  readonly type = "header";

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
