import { Client } from "@notionhq/client";
import { NotionConfigService } from "../../config/notion.config";
import { InjectToken } from "../repositories/notion/article.repository";

export const clientProvider = {
  provide: InjectToken.NOTION_CLIENT,
  useFactory: (notionConfigService: NotionConfigService) =>
    new Client({ auth: notionConfigService.notionToken }),
  inject: [NotionConfigService],
};
