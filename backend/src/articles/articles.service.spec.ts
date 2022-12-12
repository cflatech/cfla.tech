import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { NotionConfigService } from "../config/notion.config";
import { ArticlesService } from "./articles.service";
import { ArticleRepositoryProvider } from "./providers/article.repository.provider";
import { clientProvider } from "./providers/client.provider";

describe("ArticlesService", () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test.local",
        }),
      ],
      providers: [
        ArticlesService,
        NotionConfigService,
        clientProvider,
        ArticleRepositoryProvider,
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  // TODO: そのうちmock化, providerで突っ込む
  test.skip("指定したIDの記事情報が取得できる", async () => {
    const article = await service.findOne(
      "8a314058-64c6-41e4-9c86-9b62548240cd",
    );

    expect(article?.id.value).toBe("8a314058-64c6-41e4-9c86-9b62548240cd");
  });

  test.skip("指定したページの記事情報が取得できる", async () => {
    const articles = await service.getPublished(1);
    expect(articles.map((article) => article.title)).toStrictEqual([
      "4",
      "3",
      "2",
    ]);
  });
});
