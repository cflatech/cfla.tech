import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { NotionConfigService } from "./notion.config";

describe("getter", () => {
  describe("envに値が設定されている場合、", () => {
    let notionConfigService: NotionConfigService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          NotionConfigService,
          {
            provide: ConfigService,
            useValue: new ConfigService({
              NOTION_TOKEN: "test_token",
            }),
          },
        ],
      }).compile();

      notionConfigService = await moduleRef.resolve(NotionConfigService);
    });

    test("NotionのTokenが取得できる", () => {
      expect(notionConfigService.notionToken).toBe("test_token");
    });
  });

  describe("envに値が設定されていない場合、", () => {
    let notionConfigService: NotionConfigService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [NotionConfigService, ConfigService],
      }).compile();

      notionConfigService = await moduleRef.resolve(NotionConfigService);
    });

    test("NotionTokenから空文字が返ってくる", () => {
      expect(notionConfigService.notionToken).toBe("");
    });
  });
});
