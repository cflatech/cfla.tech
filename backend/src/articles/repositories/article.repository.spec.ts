import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { fail } from "assert";
import { NotionConfigService } from "../../config/notion.config";
import { Paragraph } from "../models/block/paragraph/paragraph.value-object";
import { Id } from "../models/id/id.value-object";
import { clientProvider } from "../providers/client.provider";
import { ArticlesRepository } from "./article.repository";

// NOTE: API接続が発生するため必要がないならskipする
// TODO: mockにするので気が向いたら
describe.skip("find", () => {
  describe("記事IDが与えられた場合、", () => {
    let repository: ArticlesRepository;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: ".env.test.local",
          }),
        ],
        providers: [ArticlesRepository, NotionConfigService, clientProvider],
      }).compile();

      repository = module.get<ArticlesRepository>(ArticlesRepository);
    });

    it("該当する記事のタイトルが取得できる", async () => {
      const id = new Id("8a314058-64c6-41e4-9c86-9b62548240cd");
      const article = await repository.find(id);

      expect(article?.title).toBe("タイトル");
    });

    it("該当する記事の内容が取得できる", async () => {
      const id = new Id("8a314058-64c6-41e4-9c86-9b62548240cd");
      const article = await repository.find(id);
      if (!(article?.content[1] instanceof Paragraph)) {
        fail();
      }
      expect(article.content[1].text).toBe("内容");
    });
  });
});

describe.skip("getPublic", () => {
  let repository: ArticlesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env.test.local",
        }),
      ],
      providers: [ArticlesRepository, NotionConfigService, clientProvider],
    }).compile();

    repository = module.get<ArticlesRepository>(ArticlesRepository);
  });

  test("公開中の記事が取得できる", async () => {
    const articles = await repository.getPublish(
      "441a1e02cdda4f299fab75579b31da9e",
    );
    expect(articles).toHaveLength(1);
    expect(articles[0].id.value).toBe("8a314058-64c6-41e4-9c86-9b62548240cd");
  });
});
