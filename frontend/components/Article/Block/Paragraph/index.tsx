import { createHash } from "crypto";
import { Paragraph as ParagraphType } from "../../../../types/article";
import { Item } from "../Item/item";

type Props = {
  paragraph: ParagraphType;
};

export const Paragraph = ({ paragraph }: Props): JSX.Element => (
  <p>
    {paragraph.items.map((item) => (
      <Item
        key={createHash("sha256").update(JSON.stringify(item)).digest("hex")}
        item={item}
      />
    ))}
  </p>
);
