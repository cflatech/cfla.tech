import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { NotionConfigService } from "../config/notion.config";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { ArticleRepositoryProvider } from "./providers/article.repository.provider";
import { clientProvider } from "./providers/client.provider";

describe("ArticlesController", () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test.local",
        }),
      ],
      providers: [
        ArticlesService,
        NotionConfigService,
        ArticleRepositoryProvider,
        clientProvider,
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
