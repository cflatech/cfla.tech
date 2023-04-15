import { BlockInterface } from "../block.interface";
import { BulletPoint } from "./bullet-point.value-object";

export class BulletPointList implements BlockInterface {
  readonly type = "bulletPointList";

  readonly items: BulletPoint[];

  constructor() {
    this.items = [];
  }

  addItem(item: BulletPoint) {
    this.items.push(item);
  }
}
