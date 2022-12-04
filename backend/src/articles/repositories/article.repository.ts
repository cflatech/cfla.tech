import { Inject, Injectable } from "@nestjs/common";
import { Client, isFullPage } from "@notionhq/client";
import { Article } from "../models/article.entity";
import { ArticlesRepositoryInterface } from "../models/article.repositry.interface";
import { Code } from "../models/block/code/code.value-object";
import { Header } from "../models/block/header/header.value-objcet";
import { Link } from "../models/block/link/link.value-object";
import { Paragraph } from "../models/block/paragraph/paragraph.value-object";
import { Id } from "../models/id/id.value-object";

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

    const article = new Article(id, title);

    const blocks = await this.#client.blocks.children.list({
      block_id: id.value,
    });

    blocks.results.forEach((block) => {
      if (!("type" in block)) {
        return;
      }
      if (block === null) {
        return;
      }

      switch (block.type) {
        case "paragraph": {
          block.paragraph.rich_text.forEach((paragraph) => {
            if (paragraph.href === null) {
              article.addContent(new Paragraph(paragraph.plain_text));
            } else {
              article.addContent(
                new Link(paragraph.plain_text, paragraph.href),
              );
            }
          });
          break;
        }
        case "heading_1": {
          block.heading_1.rich_text.forEach((heading) => {
            article.addContent(new Header(heading.plain_text));
          });
          break;
        }
        case "code": {
          block.code.rich_text.forEach((code) => {
            article.addContent(new Code(code.plain_text, block.code.language));
          });
          break;
        }
        default:
      }
    });

    return article;
  }
}
