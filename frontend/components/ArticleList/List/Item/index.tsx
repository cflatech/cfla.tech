import { css } from "@emotion/react";
import { styles } from "../../../../styles/styles";

const itemStyle = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  list-style: none;
`;

const title = css`
  font-weight: bold;
  font-size: ${styles.fontSize.large}px;
`;

type Props = {
  item: {
    id: string;
    title: string;
  };
};

export const Item = ({ item }: Props): JSX.Element => (
  <li css={itemStyle}>
    <div css={title}>{item.title}</div>
  </li>
);
