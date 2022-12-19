import { Text as TextType } from "../../../../../types/article";

type Props = {
  text: TextType;
};

export const Text = ({ text }: Props): JSX.Element => <span>{text.text}</span>;
