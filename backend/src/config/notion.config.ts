import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NotionConfigService {
  #configService: ConfigService;

  constructor(configService: ConfigService) {
    this.#configService = configService;
  }

  get notionToken(): string {
    return this.#configService.get<string>("NOTION_TOKEN") ?? "";
  }
}
