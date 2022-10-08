import { Id } from "../valueObjects/id.valueObject";

export class Article {
  #id: Id;

  #title: string;

  // TODO: 後でstringじゃなくてblockとかで文章としての構造を持たせる
  #content: string;

  constructor(id: Id, titile: string, content: string) {
    this.#id = id;
    this.#title = titile;
    this.#content = content;
  }

  get id(): Id {
    return this.#id;
  }

  get title(): string {
    return this.#title;
  }

  get content(): string {
    return this.#content;
  }
}
