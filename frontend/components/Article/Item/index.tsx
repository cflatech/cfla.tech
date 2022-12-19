import { css } from "@emotion/react";
import { ReactNode } from "react";

const itemStyle = css`
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  margin-bottom: 0px;
`;

type Props = {
  children: ReactNode;
};

export const Item = ({ children }: Props): JSX.Element => (
  <div css={itemStyle}>{children}</div>
);
