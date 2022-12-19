import { BlockInterface } from "../block.interface";
import { ParagraphItemInterface } from "./paragraph-item.interface";

export class Paragraph implements BlockInterface {
  readonly type = "paragraph";

  readonly items: ParagraphItemInterface[];

  constructor() {
    this.items = [];
  }

  addItem(item: ParagraphItemInterface) {
    this.items.push(item);
  }
}
