import { BlockInterface } from "./block/block-content.interface";
import { Id } from "./id/id.value-object";

export class Article {
  readonly id: Id;

  readonly title: string;

  readonly content: BlockInterface[];

  readonly date: string;

  readonly tag: string[];

  constructor(id: Id, titile: string, date: string, tag: string[]) {
    this.id = id;
    this.title = titile;
    this.date = date;
    this.tag = tag;
    this.content = [];
  }

  addContent(block: BlockInterface) {
    this.content.push(block);
  }
}
