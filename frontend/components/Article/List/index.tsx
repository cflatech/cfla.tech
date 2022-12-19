import { createHash } from "crypto";
import { css } from "@emotion/react";
import { RotatingLines } from "react-loader-spinner";
import { Item } from "../Item";
import { useArticleItems } from "../../../hooks/useArticleItems";
import { Block } from "../Block";
import { Title } from "../Title";
import { ReadMore } from "../Readmore";

type Props = {
  page: number;
};

const loading = css`
  display: flex;
  justify-content: center;
`;

export const List = ({ page }: Props): JSX.Element | null => {
  const { items, isLoading } = useArticleItems(Number(page));

  if (isLoading || items.length === 0) {
    return (
      <div>
        <Item>
          <div css={loading}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="2"
              width="96"
              visible
            />
          </div>
        </Item>
      </div>
    );
  }

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
