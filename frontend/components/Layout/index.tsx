import { css } from "@emotion/react";
import { ReactNode } from "react";
import { styles } from "../../styles/styles";
import Header from "./Header";

const background = css`
  background-color: ${styles.colors.base};
`;

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div css={background}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
