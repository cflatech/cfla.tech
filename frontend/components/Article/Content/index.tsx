import { css } from "@emotion/react";
import { createHash } from "crypto";
import { RotatingLines } from "react-loader-spinner";
import { useArticle } from "../../../hooks/useArticle";
import { Block } from "../Block";
import { Item } from "../Item";
import { Title } from "../Title";

type Props = {
  id: string;
};

const loading = css`
  display: flex;
  justify-content: center;
`;

export const Article = ({ id }: Props): JSX.Element | null => {
  const { article, error, isLoading } = useArticle(id);

  if (isLoading || error || article === null) {
    return (
      <div>
        <Item>
          <div css={loading}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="2"
              width="48"
              visible
            />
          </div>
        </Item>
      </div>
    );
  }

  return (
    <Item>
      <Title article={article} />
      {article.blocks.map((block) => (
        <Block
          key={createHash("sha256").update(JSON.stringify(block)).digest("hex")}
          block={block}
        />
      ))}
    </Item>
  );
};
