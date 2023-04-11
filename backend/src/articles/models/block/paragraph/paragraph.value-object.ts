import { BlockInterface } from "../block.interface";
import { ItemInterface } from "../item/item.interface";

export class Paragraph implements BlockInterface {
  readonly type = "paragraph";

  readonly items: ItemInterface[];

  constructor() {
    this.items = [];
  }

  addItem(item: ItemInterface) {
    this.items.push(item);
  }
}
