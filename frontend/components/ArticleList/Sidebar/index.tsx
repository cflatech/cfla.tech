import { css } from "@emotion/react";

const sideBar = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 20px;
`;

export const Sidebar = (): JSX.Element => <div css={sideBar}>サイドバー</div>;
