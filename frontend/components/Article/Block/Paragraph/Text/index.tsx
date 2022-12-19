import { Text as TextType } from "../../../../../types/article";

type Props = {
  text: TextType;
};

export const Text = ({ text }: Props): JSX.Element => {
  const texts = text.text.split("\n");

  return (
    <span>
      {texts[0]}
      {texts.slice(1).map((newLineText) => (
        <span key={newLineText}>
          <br />
          {newLineText}
        </span>
      ))}
    </span>
  );
};
