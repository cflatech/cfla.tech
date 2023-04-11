import { Inject, Injectable } from "@nestjs/common";
import { Client, isFullPage } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionConfigService } from "../../../config/notion.config";
import { Article } from "../../models/article.entity";
import { ArticleRepositoryInterface } from "../../models/article.repositry.interface";
import { Id } from "../../models/id/id.value-object";
import { parseBlockResponses } from "./notion-blocks.parser";

export enum InjectToken {
  NOTION_CLIENT = "notion_client",
}

@Injectable()
export class ArticleRepository implements ArticleRepositoryInterface {
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

          const retrievedBlocks = await this.#client.blocks.children.list({
            block_id: result.id,
          });
          const blocks = retrievedBlocks.results.filter(
            (block): block is BlockObjectResponse => {
              if (!("type" in block)) {
                return false;
              }
              if (block === null) {
                return false;
              }

              return true;
            },
          );

          parseBlockResponses(blocks).forEach((content) =>
            article.addBlock(content),
          );

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

    const retrievedBlocks = await this.#client.blocks.children.list({
      block_id: id.value,
    });

    const blocks = retrievedBlocks.results.filter(
      (block): block is BlockObjectResponse => {
        if (!("type" in block)) {
          return false;
        }
        if (block === null) {
          return false;
        }

        return true;
      },
    );

    parseBlockResponses(blocks).forEach((content) => article.addBlock(content));

    return article;
  }
}
