import { ParagraphItemInterface } from "../paragraph-item.interface";

export class Text implements ParagraphItemInterface {
  readonly type = "text";

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
