import { Header as HeaderType } from "../../../../types/article";

type Props = {
  header: HeaderType;
};

export const Header = ({ header }: Props): JSX.Element => (
  <h1>{header.text}</h1>
);
