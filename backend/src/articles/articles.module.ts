import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { NotionConfigService } from "../config/notion.config";
import { clientProvider } from "./providers/client.provider";
import { ArticlesRepositoryInterfaceToken } from "./models/article.repositry.interface";
import { ArticlesRepository } from "./repositories/article.repository";

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    NotionConfigService,
    clientProvider,
    {
      provide: ArticlesRepositoryInterfaceToken,
      useClass: ArticlesRepository,
    },
  ],
})
export class ArticlesModule {}
