import { ItemInterface } from "../item.interface";

export class Text implements ItemInterface {
  readonly type = "text";

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}
