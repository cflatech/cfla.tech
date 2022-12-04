import { BlockInterface } from "../block-content.interface";

export class Paragraph implements BlockInterface {
  readonly type = "paragraph";

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
