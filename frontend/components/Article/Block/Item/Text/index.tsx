import { css } from "@emotion/react";
import { Text as TextType } from "../../../../../types/article";

type Props = {
  text: TextType;
};

const code = css`
  background-color: lightgrey;
  padding: 3px;
`;

export function Text({ text }: Props): JSX.Element {
  const texts = text.text.split("\n");

  if (text.isCode) {
    return <code css={code}>{text.text}</code>;
  }

  return (
    <span>
      <span>{texts[0]}</span>
      {texts.slice(1).map((newLineText) => (
        <>
          <br />
          <span key={newLineText}>{newLineText}</span>
        </>
      ))}
    </span>
  );
}
