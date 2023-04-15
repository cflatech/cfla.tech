/* eslint-disable jsx-a11y/anchor-is-valid */
import { ArticleBlock } from "../../../types/article";
import { BulletPointList } from "./BulletPointList";
import { Code } from "./Code";
import { Header } from "./Header";
import { ImageBlock } from "./Image";
import { Paragraph } from "./Paragraph";

type Props = {
  block: ArticleBlock;
};

export const Block = ({ block }: Props): JSX.Element | null => {
  switch (block.type) {
    case "code": {
      return <Code code={block} />;
    }
    case "header": {
      return <Header header={block} />;
    }
    case "paragraph": {
      return <Paragraph paragraph={block} />;
    }
    case "image": {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <ImageBlock image={block} />;
    }
    case "bulletPointList": {
      return <BulletPointList bulletPointList={block} />;
    }
    default: {
      return null;
    }
  }
};
