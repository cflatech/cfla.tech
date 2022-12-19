import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockInterface } from "../../models/block/block-content.interface";
import { Code } from "../../models/block/code/code.value-object";
import { Header } from "../../models/block/header/header.value-objcet";
import { Link } from "../../models/block/paragraph/link/link.value-object";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";

export function parseBlockResponse(
  blockResponse: BlockObjectResponse,
): BlockInterface[] {
  const blocks: BlockInterface[] = [];

  switch (blockResponse.type) {
    case "paragraph": {
      blockResponse.paragraph.rich_text.forEach((paragraph) => {
        if (paragraph.href === null) {
          blocks.push(new Paragraph(paragraph.plain_text));
        } else {
          blocks.push(new Link(paragraph.plain_text, paragraph.href));
        }
      });
      break;
    }
    case "heading_1": {
      blockResponse.heading_1.rich_text.forEach((heading) => {
        blocks.push(new Header(heading.plain_text));
      });
      break;
    }
    case "code": {
      blockResponse.code.rich_text.forEach((code) => {
        blocks.push(new Code(code.plain_text, blockResponse.code.language));
      });
      break;
    }
    default:
  }

  return blocks;
}
