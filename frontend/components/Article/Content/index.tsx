import { createHash } from "crypto";
import { useArticle } from "../../../hooks/useArticle";
import { Block } from "../Block";
import { Item } from "../Item";
import { Title } from "../Title";

type Props = {
  id: string;
};

export const Article = ({ id }: Props): JSX.Element | null => {
  const { article, error, isLoading } = useArticle(id);

  if (isLoading || error || article === null) {
    return null;
  }

  return (
    <Item>
      <Title article={article} />
      {article.blocks.map((block) => (
        <Block
          key={createHash("sha256").update(block.text).digest("hex")}
          block={block}
        />
      ))}
    </Item>
  );
};
