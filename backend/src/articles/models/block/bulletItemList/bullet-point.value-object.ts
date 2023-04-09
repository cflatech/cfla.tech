import { BulletPointItemInterface } from "./bullet-point-item.interface";

export class BulletPoint {
  readonly type = "bulletPoint";

  readonly items: BulletPointItemInterface[];

  constructor() {
    this.items = [];
  }

  addItem(item: BulletPointItemInterface) {
    this.items.push(item);
  }
}
