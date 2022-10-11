import { Test } from "@nestjs/testing";
import { Client } from "@notionhq/client";
import { Id } from "../valueObjects/id.valueObject";
import { ArticlesRepository, InjectToken } from "./article.repository";

describe("find", () => {
  describe("記事IDが与えられた場合、", () => {
    let repository: ArticlesRepository;

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        providers: [
          ArticlesRepository,
          {
            provide: InjectToken.NOTION_CLIENT,
            useValue: new Client({
              auth: "",
            }),
          },
        ],
      }).compile();

      repository = module.get<ArticlesRepository>(ArticlesRepository);
    });

    it("該当する記事のタイトルが取得できる", async () => {
      const id = new Id("8a314058-64c6-41e4-9c86-9b62548240cd");
      const article = await repository.find(id);

      expect(article?.title).toBe("タイトル");
    });

    it.skip("該当する記事の内容が取得できる");
  });
});
