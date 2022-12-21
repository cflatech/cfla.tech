import { css } from "@emotion/react";
import { styles } from "../../../styles/styles";
import { Article } from "../../../types/article";

const title = css`
  font-weight: bold;
  font-size: ${styles.fontSize.large}px;
  border-bottom: 2px solid;
  display: flex;
  justify-content: space-between;
`;

const square = css`
  width: ${styles.fontSize.large / 2}px;
  height: ${styles.fontSize.large}px;
  background-color: ${styles.colors.accent};
  display: inline-block;
  margin-right: 10px;
  vertical-align: -4px;
  white-space: nowrap;
`;

const titleText = css`
  display: inline-block;
`;

const time = css`
  font-size: ${styles.fontSize.medium}px;
`;

type Props = {
  article: Article;
};

export const Title = ({ article }: Props): JSX.Element => (
  <div css={title}>
    <div>
      <div css={titleText}>
        <div css={square} />
        {article.title}
      </div>
    </div>
    <div>
      <time css={time}>{article.date}</time>
    </div>
  </div>
);
