import { Inject, Injectable } from "@nestjs/common";
import { Client, isFullPage } from "@notionhq/client";
import { Article } from "../entities/article.entity";
import { ArticlesRepositoryInterface } from "../entities/article.repositry.interface";
import { Id } from "../valueObjects/id.valueObject";

export enum InjectToken {
  NOTION_CLIENT = "notion_client",
}

@Injectable()
export class ArticlesRepository implements ArticlesRepositoryInterface {
  #client: Client;

  constructor(@Inject(InjectToken.NOTION_CLIENT) client: Client) {
    this.#client = client;
  }

  async find(id: Id): Promise<Article | null> {
    const pageResponse = await this.#client.pages.retrieve({
      page_id: id.value,
    });

    if (!isFullPage(pageResponse)) {
      return null;
    }

    const title =
      pageResponse.properties.Title.type === "title"
        ? pageResponse.properties.Title.title[0].plain_text
        : "";

    return new Article(id, title, "fuga");
  }
}
