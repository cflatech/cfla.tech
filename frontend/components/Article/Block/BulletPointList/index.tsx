import { createHash } from "crypto";
import { BulletPointList as BulletPointListType } from "../../../../types/article";
import { Item } from "../Item/item";

type Props = {
  bulletPointList: BulletPointListType;
};

export function BulletPointList({ bulletPointList }: Props): JSX.Element {
  return (
    <ul>
      {bulletPointList.items.map((item) => (
        <li
          key={createHash("sha256").update(JSON.stringify(item)).digest("hex")}
        >
          {item.items.map((value) => (
            <Item
              key={createHash("sha256")
                .update(JSON.stringify(value))
                .digest("hex")}
              item={value}
            />
          ))}
        </li>
      ))}
    </ul>
  );
}
