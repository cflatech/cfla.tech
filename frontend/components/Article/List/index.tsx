import { createHash } from "crypto";
import { Item } from "../Item";
import { useArticleItems } from "../../../hooks/useArticleItems";
import { Block } from "../Block";
import { Title } from "../Title";
import { ReadMore } from "../Readmore";

type Props = {
  page: number;
};

export const List = ({ page }: Props): JSX.Element | null => {
  const { items, isLoading } = useArticleItems(Number(page));

  if (isLoading) return null;
  if (items.length === 0) return null;

  return (
    <div data-testid="list">
      {items?.map((item) => (
        <Item key={item.id}>
          <Title article={item} />
          {item.blocks.slice(0, 3).map((block) => (
            <Block
              key={createHash("sha256").update(block.text).digest("hex")}
              block={block}
            />
          ))}
          <ReadMore article={item} />
        </Item>
      ))}
    </div>
  );
};
