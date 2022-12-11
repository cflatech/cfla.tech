import { css } from "@emotion/react";
import { styles } from "../../../styles/styles";
import Logo from "../../../icons/cflatech.svg";

const header = css`
  background-color: ${styles.colors.main};
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const headerContent = css`
  max-width: ${styles.layouts.maxWidth}px;
  width: 100%;
`;

const logo = css`
  padding-left: 20px;
`;

export default function Header(): JSX.Element {
  return (
    <header css={header}>
      <div css={headerContent}>
        <div css={logo}>
          <Logo />
        </div>
      </div>
    </header>
  );
}
