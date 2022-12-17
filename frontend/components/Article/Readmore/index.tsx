import Link from "next/link";
import { css } from "@emotion/react";
import { styles } from "../../../styles/styles";
import { Article } from "../../../types/article";

const readMore = css`
  display: flex;
  justify-content: right;
  font-size: ${styles.fontSize.medium};
  margin-top: 20px;
`;

type Props = {
  article: Article;
};

export const ReadMore = ({ article }: Props): JSX.Element => (
  <div css={readMore}>
    <Link href={`/article/${article.id}`}>続きを読む</Link>
  </div>
);
