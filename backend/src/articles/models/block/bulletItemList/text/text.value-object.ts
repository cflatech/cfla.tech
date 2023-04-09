import { BulletPointItemInterface } from "../bullet-point-item.interface";

export class Text implements BulletPointItemInterface {
  readonly type = "text";

  readonly text: string;

  readonly isCode: boolean;

  constructor(text: string, isCode = false) {
    this.text = text;
    this.isCode = isCode;
  }
}
