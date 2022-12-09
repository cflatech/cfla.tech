import { css } from "@emotion/react";

const listBox = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 20px;
`;

export const List = (): JSX.Element => <div css={listBox}>記事リスト</div>;
