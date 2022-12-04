import { BlockInterface } from "./block/block-content.interface";
import { Id } from "./id/id.value-object";

export class Article {
  readonly id: Id;

  readonly title: string;

  readonly content: BlockInterface[];

  constructor(id: Id, titile: string) {
    this.id = id;
    this.title = titile;
    this.content = [];
  }

  addContent(block: BlockInterface) {
    this.content.push(block);
  }
}
