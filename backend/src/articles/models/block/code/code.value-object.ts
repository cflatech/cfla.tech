import { BlockInterface } from "../block-content.interface";

export class Code implements BlockInterface {
  readonly type = "code";

  readonly text: string;

  readonly language: string;

  constructor(text: string, language: string) {
    this.text = text;
    this.language = language;
  }
}
