import { Id } from "../valueObjects/id.valueObject";
import { Article } from "./article.entity";

describe("getter", () => {
  describe("記事が生成できた場合、", () => {
    let article: Article;
    let id: Id;

    beforeAll(() => {
      id = new Id("550e8400-e29b-41d4-a716-446655440000");
      article = new Article(id, "タイトル", "内容");
    });

    test("設定されたタイトルが取得できる", () => {
      expect(article.title).toBe("タイトル");
    });

    test("設定された記事内容が取得できる", () => {
      expect(article.content).toBe("内容");
    });

    test("設定されたIDが取得できる", () => {
      expect(article.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    });
  });
});
