import { BlockInterface } from "../../block-content.interface";

export class Link implements BlockInterface {
  readonly type = "link";

  readonly text: string;

  readonly link: string;

  constructor(text: string, link: string) {
    this.text = text;
    this.link = link;
  }
}
