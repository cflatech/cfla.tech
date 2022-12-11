import { Article } from "./article.entity";
import { Code } from "./block/code/code.value-object";
import { Paragraph } from "./block/paragraph/paragraph.value-object";
import { Id } from "./id/id.value-object";

describe("getter", () => {
  describe("記事が生成できた場合、", () => {
    let article: Article;
    let id: Id;

    beforeEach(() => {
      id = new Id("550e8400-e29b-41d4-a716-446655440000");
      article = new Article(id, "タイトル", "2022-01-01", ["tag1", "tag2"]);
    });

    test("設定されたタイトルが取得できる", () => {
      expect(article.title).toBe("タイトル");
    });

    test("設定されたIDが取得できる", () => {
      expect(article.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    });

    test("記事の公開日が取得できる", () => {
      expect(article.date).toBe("2022-01-01");
    });

    test("記事のタグが取得できる", () => {
      expect(article.tag).toEqual(["tag1", "tag2"]);
    });

    test("記事内容がブロックごとに追加できる", () => {
      const paragraph = new Paragraph("paragraph-content");
      const code = new Code("code-content", "typescript");
      article.addContent(paragraph);
      article.addContent(code);

      expect(article.content[0]).toBeInstanceOf(Paragraph);
      expect(article.content[1]).toBeInstanceOf(Code);
    });
  });
});
