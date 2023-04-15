import { ItemInterface } from "../item.interface";

export class Text implements ItemInterface {
  readonly type = "text";

  readonly text: string;

  readonly isCode: boolean;

  constructor(text: string, isCode = false) {
    this.text = text;
    this.isCode = isCode;
  }
}
