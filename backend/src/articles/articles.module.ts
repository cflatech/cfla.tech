import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { NotionConfigService } from "../config/notion.config";
import { clientProvider } from "./providers/client.provider";
import { ArticleRepositoryProvider } from "./providers/article.repository.provider";

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    NotionConfigService,
    clientProvider,
    ArticleRepositoryProvider,
  ],
})
export class ArticlesModule {}
