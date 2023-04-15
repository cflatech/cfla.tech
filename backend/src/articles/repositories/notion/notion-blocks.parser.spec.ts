import {
  Heading1BlockObjectResponse,
  CodeBlockObjectResponse,
  ParagraphBlockObjectResponse,
  ImageBlockObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";
import { parseBlockResponses } from "./notion-blocks.parser";
import { Link } from "../../models/block/item/link/link.value-object";
import { Text } from "../../models/block/item/text/text.value-object";
import { BulletPointList } from "../../models/block/bulletItemList/bullet-point-list.value-object";
import { BulletPoint } from "../../models/block/bulletItemList/bullet-point.value-object";

describe("parseBlockResponses", () => {
  describe("headerが与えられた場合、", () => {
    const headerBlockResponse: Heading1BlockObjectResponse[] = [
      {
        object: "block",
        id: "7cc40237-a1af-42b1-a1b4-f455f5ceefff",
        parent: {
          type: "page_id",
          page_id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
        },
        created_time: "2022-12-19T20:39:00.000Z",
        last_edited_time: "2022-12-19T20:39:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: { content: "これはテスト記事です", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "これはテスト記事です",
              href: null,
            },
          ],
          color: "default",
        },
      },
    ];

    test("HeaderのBlockが返る", () => {
      expect(parseBlockResponses(headerBlockResponse)[0].type).toBe("header");
    });
  });

  describe("bulleted_list_itemが与えられた場合", () => {
    const responses: BlockObjectResponse[] = [
      {
        object: "block",
        id: "f73c491e-7967-4d1f-94ef-e9544ca0f553",
        parent: {
          type: "page_id",
          page_id: "c2b30405-a459-4dac-af32-e4a210b9400c",
        },
        created_time: "2023-04-09T09:10:00.000Z",
        last_edited_time: "2023-04-09T11:53:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              type: "text",
              text: { content: "TL:DR", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "TL:DR",
              href: null,
            },
          ],
          color: "default",
        },
      },
      {
        object: "block",
        id: "80412871-2f3e-4b9f-bb9f-600307cd8c29",
        parent: {
          type: "page_id",
          page_id: "c2b30405-a459-4dac-af32-e4a210b9400c",
        },
        created_time: "2023-04-09T09:11:00.000Z",
        last_edited_time: "2023-04-09T09:12:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  "Trailing Slashを有効化しつつnext.config.jsでRewrites 機能を有効化すると next/link 等を利用時正常に遷移できない",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text:
                "Trailing Slashを有効化しつつnext.config.jsでRewrites 機能を有効化すると next/link 等を利用時正常に遷移できない",
              href: null,
            },
          ],
          color: "default",
        },
      },
      {
        object: "block",
        id: "13556e4b-d5dc-431d-b953-65502b980b57",
        parent: {
          type: "page_id",
          page_id: "c2b30405-a459-4dac-af32-e4a210b9400c",
        },
        created_time: "2023-04-09T09:12:00.000Z",
        last_edited_time: "2023-04-09T09:12:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "Next.jsのRewrites時の処理に問題があるっぽい",
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Next.jsのRewrites時の処理に問題があるっぽい",
              href: null,
            },
          ],
          color: "default",
        },
      },
      {
        object: "block",
        id: "9dd7e3e3-6fb6-408c-8bf2-1aefa06543e4",
        parent: {
          type: "page_id",
          page_id: "c2b30405-a459-4dac-af32-e4a210b9400c",
        },
        created_time: "2023-04-11T14:37:00.000Z",
        last_edited_time: "2023-04-11T14:42:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "テスト文字列", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "テスト文字列",
              href: null,
            },
          ],
          color: "default",
        },
      },
    ];

    test("連続するitemがbulletPointListとして構成されて返る", () => {
      const bulletPointList = new BulletPointList();

      const bulletPoint = new BulletPoint();
      bulletPoint.addItem(
        new Text(
          "Trailing Slashを有効化しつつnext.config.jsでRewrites 機能を有効化すると next/link 等を利用時正常に遷移できない",
        ),
      );

      const bulletPoint2 = new BulletPoint();
      bulletPoint2.addItem(
        new Text("Next.jsのRewrites時の処理に問題があるっぽい"),
      );

      bulletPointList.addItem(bulletPoint);
      bulletPointList.addItem(bulletPoint2);

      expect(
        parseBlockResponses(responses).filter(
          (response) => response.type === "bulletPointList",
        )[0],
      ).toEqual(bulletPointList);
    });

    test("bulletPointListで終わった場合でもblockに追加される", () => {
      const bulletPointList = new BulletPointList();

      const bulletPoint = new BulletPoint();
      bulletPoint.addItem(
        new Text(
          "Trailing Slashを有効化しつつnext.config.jsでRewrites 機能を有効化すると next/link 等を利用時正常に遷移できない",
        ),
      );

      const bulletPoint2 = new BulletPoint();
      bulletPoint2.addItem(
        new Text("Next.jsのRewrites時の処理に問題があるっぽい"),
      );

      bulletPointList.addItem(bulletPoint);
      bulletPointList.addItem(bulletPoint2);

      expect(
        parseBlockResponses(responses.slice(0, responses.length - 1)).filter(
          (response) => response.type === "bulletPointList",
        )[0],
      ).toEqual(bulletPointList);
    });
  });

  describe("codeが与えられた場合、", () => {
    const codeBlockResponse: CodeBlockObjectResponse[] = [
      {
        object: "block",
        id: "d13e1b4a-040a-4a0f-8e45-6803f1a370c9",
        parent: {
          type: "page_id",
          page_id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
        },
        created_time: "2022-12-19T20:39:00.000Z",
        last_edited_time: "2022-12-19T20:40:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "code",
        code: {
          caption: [],
          rich_text: [
            {
              type: "text",
              text: {
                content:
                  'import { css } from "@emotion/react";\nimport { ReactNode } from "react";\n\nconst itemStyle = css`\n  border-radius: 15px;\n  background-color: #fff;\n  padding: 20px;\n  margin: 10px;\n  margin-bottom: 0px;\n`;\n\ntype Props = {\n  children: ReactNode;\n};\n\nexport const Item = ({ children }: Props): JSX.Element => (\n  <div css={itemStyle}>{children}</div>\n);',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text:
                'import { css } from "@emotion/react";\nimport { ReactNode } from "react";\n\nconst itemStyle = css`\n  border-radius: 15px;\n  background-color: #fff;\n  padding: 20px;\n  margin: 10px;\n  margin-bottom: 0px;\n`;\n\ntype Props = {\n  children: ReactNode;\n};\n\nexport const Item = ({ children }: Props): JSX.Element => (\n  <div css={itemStyle}>{children}</div>\n);',
              href: null,
            },
          ],
          language: "typescript",
        },
      },
    ];
    test("CodeのBlockが返る", () => {
      expect(parseBlockResponses(codeBlockResponse)[0].type).toBe("code");
    });
  });

  describe("paragraphが与えられた場合、", () => {
    const codeBlockResponse: ParagraphBlockObjectResponse[] = [
      {
        object: "block",
        id: "5e7010db-158d-4304-836c-019266fb16d2",
        parent: {
          type: "page_id",
          page_id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
        },
        created_time: "2022-12-19T20:40:00.000Z",
        last_edited_time: "2022-12-19T20:41:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "これは", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "これは",
              href: null,
            },
            {
              type: "text",
              text: {
                content: "Googleへのリンク",
                link: { url: "http://google.co.jp" },
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "Googleへのリンク",
              href: "http://google.co.jp",
            },
            {
              type: "text",
              text: { content: "です。", link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: "です。",
              href: null,
            },
          ],
          color: "default",
        },
      },
    ];

    test("ParagraphのBlockが返る", () => {
      expect(parseBlockResponses(codeBlockResponse)[0].type).toBe("paragraph");
    });

    test("Paragprahにtextアイテムが追加される", () => {
      const block = parseBlockResponses(codeBlockResponse)[0];
      if (block.type !== "paragraph") {
        expect(block.type).toBe("paragraph");
      }

      expect((block as Paragraph).items[0]).toEqual(new Text("これは"));
    });

    test("Paragprahにlinkアイテムが追加される", () => {
      const block = parseBlockResponses(codeBlockResponse)[0];
      if (block.type !== "paragraph") {
        expect(block.type).toBe("paragraph");
      }

      expect((block as Paragraph).items[1]).toEqual(
        new Link("Googleへのリンク", "http://google.co.jp"),
      );
    });
  });

  describe("External imageが与えられた場合、", () => {
    const imageBlockResponse: ImageBlockObjectResponse[] = [
      {
        object: "block",
        id: "af4cc789-b991-4620-827d-8b8d5eaf8305",
        parent: {
          type: "page_id",
          page_id: "36c6fbf7-e0ce-410e-815f-ff92b2fb5573",
        },
        created_time: "2022-12-20T20:12:00.000Z",
        last_edited_time: "2022-12-20T20:12:00.000Z",
        created_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        last_edited_by: {
          object: "user",
          id: "db98644d-8965-4b01-82f0-6c544a2e4cdf",
        },
        has_children: false,
        archived: false,
        type: "image",
        image: {
          caption: [],
          type: "external",
          external: { url: "https://placehold.jp/150x150.png" },
        },
      },
    ];

    test("ImageのBlockが返る", () => {
      expect(parseBlockResponses(imageBlockResponse)[0].type).toBe("image");
    });
  });
});
