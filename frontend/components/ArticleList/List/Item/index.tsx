import Link from "next/link";
import { css } from "@emotion/react";
import { styles } from "../../../../styles/styles";

const itemStyle = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 10px;
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
  item: {
    id: string;
    title: string;
  };
};

// TODO: 後でコンポーネント分ける
export const Item = ({ item }: Props): JSX.Element => (
  <li css={itemStyle}>
    <div css={title}>
      <div>
        <div css={square} />
        <div css={titleText}>{item.title}</div>
      </div>
      <div>
        <time css={time}>2022-01-01</time>
      </div>
    </div>
    <div css={article}>
      なんか文章
      <br />
      なんか文章
      <br />
      なんか文章
      <br />
      なんか文章
      <br />
      なんか文章
      <br />
      とってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとってもとっても長い文章
    </div>
    <Link css={readMore} href="/">
      続きを読む
    </Link>
  </li>
);
