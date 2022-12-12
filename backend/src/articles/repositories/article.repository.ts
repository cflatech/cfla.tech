import { Inject, Injectable } from "@nestjs/common";
import { Client, isFullPage } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionConfigService } from "../../config/notion.config";
import { Article } from "../models/article.entity";
import { ArticlesRepositoryInterface } from "../models/article.repositry.interface";
import { BlockInterface } from "../models/block/block-content.interface";
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

  #databaseId: string;

  constructor(
    @Inject(InjectToken.NOTION_CLIENT) client: Client,
    config: NotionConfigService,
  ) {
    this.#client = client;
    this.#databaseId = config.notionDatabaseId;
  }

  // TODO: でかすぎるのでリファクタ予定
  async getPublished(): Promise<Article[]> {
    const articlesResponse = await this.#client.databases.query({
      database_id: this.#databaseId,
      filter: {
        property: "Publish",
        checkbox: {
          equals: true,
        },
      },
    });

    const articles = (
      await Promise.all(
        articlesResponse.results.map(async (result) => {
          if (!("properties" in result)) {
            return null;
          }

          const { properties } = result;
          if (properties.Publish.type !== "checkbox") {
            return null;
          }

          if (properties.Date.type !== "date") {
            return null;
          }

          if (properties.Tag.type !== "multi_select") {
            return null;
          }

          if (properties.Title.type !== "title") {
            return null;
          }

          const pageResponse = await this.#client.pages.retrieve({
            page_id: result.id,
          });

          if (!isFullPage(pageResponse)) {
            return null;
          }

          const article = new Article(
            new Id(result.id),
            properties.Title.title.map((title) => title.plain_text).at(0) ?? "",
            properties.Date.date?.start ?? "",
            properties.Tag.multi_select.map((tag) => tag.name),
          );

          const blocks = await this.#client.blocks.children.list({
            block_id: result.id,
          });
          blocks.results.forEach((block) => {
            if (!("type" in block)) {
              return;
            }
            if (block === null) {
              return;
            }

            this.parseBlockResponse(block).forEach((content) =>
              article.addContent(content),
            );
          });

          return article;
        }),
      )
    ).filter((article): article is Article => !!article);

    return articles;
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

    const article = new Article(id, title, "", []);

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

      this.parseBlockResponse(block).forEach((content) =>
        article.addContent(content),
      );
    });

    return article;
  }

  private parseBlockResponse(
    blockResponse: BlockObjectResponse,
  ): BlockInterface[] {
    const blocks: BlockInterface[] = [];

    switch (blockResponse.type) {
      case "paragraph": {
        blockResponse.paragraph.rich_text.forEach((paragraph) => {
          if (paragraph.href === null) {
            blocks.push(new Paragraph(paragraph.plain_text));
          } else {
            blocks.push(new Link(paragraph.plain_text, paragraph.href));
          }
        });
        break;
      }
      case "heading_1": {
        blockResponse.heading_1.rich_text.forEach((heading) => {
          blocks.push(new Header(heading.plain_text));
        });
        break;
      }
      case "code": {
        blockResponse.code.rich_text.forEach((code) => {
          blocks.push(new Code(code.plain_text, blockResponse.code.language));
        });
        break;
      }
      default:
    }

    return blocks;
  }
}
