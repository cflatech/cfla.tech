import {
  Heading1BlockObjectResponse,
  CodeBlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Link } from "../../models/block/paragraph/link/link.value-object";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";
import { Text } from "../../models/block/paragraph/text/text.value-object";
import { parseBlockResponse } from "./notion-block.parser";

describe("parseBlockResponse", () => {
  describe("headerが与えられた場合、", () => {
    const headerBlockResponse: Heading1BlockObjectResponse = {
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
    };

    test("HeaderのBlockが返る", () => {
      expect(parseBlockResponse(headerBlockResponse)[0].type).toBe("header");
    });
  });

  describe("codeが与えられた場合、", () => {
    const codeBlockResponse: CodeBlockObjectResponse = {
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
    };
    test("CodeのBlockが返る", () => {
      expect(parseBlockResponse(codeBlockResponse)[0].type).toBe("code");
    });
  });

  describe("paragraphが与えられた場合、", () => {
    const codeBlockResponse: ParagraphBlockObjectResponse = {
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
    };

    test("ParagraphのBlockが返る", () => {
      expect(parseBlockResponse(codeBlockResponse)[0].type).toBe("paragraph");
    });

    test("Paragprahにtextアイテムが追加される", () => {
      const block = parseBlockResponse(codeBlockResponse)[0];
      if (block.type !== "paragraph") {
        expect(block.type).toBe("paragraph");
      }

      expect((block as Paragraph).items[0]).toEqual(new Text("これは"));
    });

    test("Paragprahにlinkアイテムが追加される", () => {
      const block = parseBlockResponse(codeBlockResponse)[0];
      if (block.type !== "paragraph") {
        expect(block.type).toBe("paragraph");
      }

      expect((block as Paragraph).items[1]).toEqual(
        new Link("Googleへのリンク", "http://google.co.jp"),
      );
    });
  });
});
