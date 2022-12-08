import { css } from "@emotion/react";
import { styles } from "../../../styles/styles";
import Logo from "../../../icons/cflatech.svg";

const header = css`
  background-color: ${styles.colors.main};
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const headerContent = css`
  max-width: ${styles.layouts.maxWidth}px;
  width: 100%;
`;

export default function Header(): JSX.Element {
  return (
    <header css={header}>
      <div css={headerContent}>
        <Logo />
      </div>
    </header>
  );
}
