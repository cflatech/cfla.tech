import Link from "next/link";
import { css } from "@emotion/react";
import { styles } from "../../../../styles/styles";
import { Article } from "../../../../types/article";
import { ReactNode } from "react";

const itemStyle = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  margin-bottom: 0px;
  list-style: none;
`;

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
`;

const titleText = css`
  display: inline-block;
`;

const time = css`
  font-size: ${styles.fontSize.medium}px;
`;

const article = css`
  margin-top: 20px;
`;

const readMore = css`
  display: flex;
  justify-content: right;
  font-size: ${styles.fontSize.medium};
  margin-top: 20px;
`;

type Props = {
  item: Article;
  children?: ReactNode;
};

// TODO: 後でコンポーネント分ける
export const Item = ({ item, children }: Props): JSX.Element => (
  <li css={itemStyle}>
    <div css={title}>
      <div>
        <div css={square} />
        <div css={titleText}>{item.title}</div>
      </div>
      <div>
        <time css={time}>{item.date}</time>
      </div>
    </div>
    <div css={article}>{children}</div>
    <Link css={readMore} href={`/article/${item.id}`}>
      続きを読む
    </Link>
  </li>
);
