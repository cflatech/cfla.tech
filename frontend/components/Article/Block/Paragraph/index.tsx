/* eslint-disable jsx-a11y/anchor-is-valid */
import { Paragraph as ParagraphType } from "../../../../types/article";
import { Link } from "./Link";
import { Text } from "./Text";

type Props = {
  paragraph: ParagraphType;
};

export const Paragraph = ({ paragraph }: Props): JSX.Element => (
  <p>
    {paragraph.items.map((item) => {
      if (item.type === "text") return <Text text={item} />;
      if (item.type === "link") return <Link link={item} />;
      return null;
    })}
  </p>
);
