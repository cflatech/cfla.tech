import { ItemInterface } from "../item/item.interface";

export class BulletPoint {
  readonly type = "bulletPoint";

  readonly items: ItemInterface[];

  constructor() {
    this.items = [];
  }

  addItem(item: ItemInterface) {
    this.items.push(item);
  }
}
