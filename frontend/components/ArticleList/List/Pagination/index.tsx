import { css } from "@emotion/react";
import Link from "next/link";
import { styles } from "../../../../styles/styles";

const pagination = css`
  display: flex;
  justify-content: space-between;
`;

const button = css`
  text-align: center;
  border-radius: 15px;
  font-weight: bold;
  margin: 20px;
  margin-bottom: 0px;
  width: calc(${styles.layouts.maxWidth}px / 10);
`;

export const Pagination = (): JSX.Element => (
  <div css={pagination}>
    <Link href="/">
      <div css={button}>次のページ</div>
    </Link>
    <Link href="/">
      <div css={button}>前のページ</div>
    </Link>
  </div>
);
