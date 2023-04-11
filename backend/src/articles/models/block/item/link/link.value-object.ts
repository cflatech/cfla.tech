import { ItemInterface } from "../item.interface";

export class Link implements ItemInterface {
  readonly type = "link";

  readonly text: string;

  readonly link: string;

  constructor(text: string, link: string) {
    this.text = text;
    this.link = link;
  }
}
