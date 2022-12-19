import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { fail } from "assert";
import { NotionConfigService } from "../../../config/notion.config";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";
import { Id } from "../../models/id/id.value-object";
import { clientProvider } from "../../providers/client.provider";
import { ArticleRepository } from "./article.repository";

// NOTE: API接続が発生するため必要がないならskipする
// TODO: mockにするので気が向いたら
describe.skip("find", () => {
  describe("記事IDが与えられた場合、", () => {
    let repository: ArticleRepository;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: ".env.test.local",
          }),
        ],
        providers: [ArticleRepository, NotionConfigService, clientProvider],
      }).compile();

      repository = module.get<ArticleRepository>(ArticleRepository);
    });

    it("該当する記事のタイトルが取得できる", async () => {
      const id = new Id("8a314058-64c6-41e4-9c86-9b62548240cd");
      const article = await repository.find(id);

      expect(article?.title).toBe("タイトル");
    });

    it("該当する記事のパラグラフが取得できる", async () => {
      const id = new Id("8a314058-64c6-41e4-9c86-9b62548240cd");
      const article = await repository.find(id);
      if (!(article?.blocks[1] instanceof Paragraph)) {
        fail();
      }
      expect(article.blocks[1].type).toBe("paragraph");
    });
  });
});

describe.skip("getPublic", () => {
  let repository: ArticleRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test.local",
        }),
      ],
      providers: [ArticleRepository, NotionConfigService, clientProvider],
    }).compile();

    repository = module.get<ArticleRepository>(ArticleRepository);
  });

  test("公開中の記事が取得できる", async () => {
    const articles = await repository.getPublished();
    expect(articles).toHaveLength(5);
    expect(
      articles.find(
        (article) =>
          article.id.value === "aa056558-2696-4542-adbe-5f8b2d0d181f",
      ),
    ).not.toBeUndefined();
  });
});
