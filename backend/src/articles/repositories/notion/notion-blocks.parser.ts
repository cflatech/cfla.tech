import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BlockInterface } from "../../models/block/block.interface";
import { Code } from "../../models/block/code/code.value-object";
import { Header } from "../../models/block/header/header.value-objcet";
import { Image } from "../../models/block/image/image.value-object";
import { Paragraph } from "../../models/block/paragraph/paragraph.value-object";
import { Text } from "../../models/block/item/text/text.value-object";
import { Link } from "../../models/block/item/link/link.value-object";
import { BulletPointList } from "../../models/block/bulletItemList/bullet-point-list.value-object";
import { BulletPoint } from "../../models/block/bulletItemList/bullet-point.value-object";

type ResponseType = BlockObjectResponse["type"];

export function parseBlockResponses(
  blockResponses: BlockObjectResponse[],
): BlockInterface[] {
  const blocks: BlockInterface[] = [];
  let beforeResponseType: ResponseType | "" = "";

  let bulletPointList: BulletPointList = new BulletPointList();

  blockResponses.forEach((blockResponse) => {
    const isBulletPointListOver =
      beforeResponseType === "bulleted_list_item" &&
      beforeResponseType !== blockResponse.type;

    if (isBulletPointListOver && bulletPointList.items.length >= 1) {
      blocks.push(bulletPointList);
      bulletPointList = new BulletPointList();
    }

    beforeResponseType = blockResponse.type;
    switch (blockResponse.type) {
      case "paragraph": {
        const paragraph = new Paragraph();

        blockResponse.paragraph.rich_text.forEach((item) => {
          if (item.href === null) {
            paragraph.addItem(new Text(item.plain_text, item.annotations.code));
          } else {
            paragraph.addItem(new Link(item.plain_text, item.href));
          }
        });
        blocks.push(paragraph);
        break;
      }
      case "bulleted_list_item": {
        const bulletPoint = new BulletPoint();

        blockResponse.bulleted_list_item.rich_text.forEach((item) => {
          if (item.type === "text") {
            if (item.href === null) {
              bulletPoint.addItem(
                new Text(item.plain_text, item.annotations.code),
              );
            } else {
              bulletPoint.addItem(new Link(item.plain_text, item.href));
            }
          }
        });

        bulletPointList.addItem(bulletPoint);
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
      case "image": {
        if (blockResponse.image.type === "external") {
          blocks.push(new Image(blockResponse.image.external.url));
        }
        // TODO: 貼り付けた画像も配信できるようにする
        break;
      }
      default:
    }
  });

  if (bulletPointList.items.length >= 1) {
    blocks.push(bulletPointList);
    bulletPointList = new BulletPointList();
  }

  return blocks;
}
