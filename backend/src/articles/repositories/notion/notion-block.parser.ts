import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockInterface } from "../../models/block/block.interface";
import { Code } from "../../models/block/code/code.value-object";
import { Header } from "../../models/block/header/header.value-objcet";
import { Link } from "../../models/block/paragraph/link/link.value-object";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";
import { Text } from "../../models/block/paragraph/text/text.value-object";

export function parseBlockResponse(
  blockResponse: BlockObjectResponse,
): BlockInterface[] {
  const blocks: BlockInterface[] = [];

  switch (blockResponse.type) {
    case "paragraph": {
      const paragraph = new Paragraph();
      blockResponse.paragraph.rich_text.forEach((item) => {
        if (item.href === null) {
          paragraph.addItem(new Text(item.plain_text));
        } else {
          paragraph.addItem(new Link(item.plain_text, item.href));
        }
      });
      blocks.push(paragraph);
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
