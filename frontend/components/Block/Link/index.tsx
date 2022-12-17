import { Link as LinkType } from "../../../types/article";

type Props = {
  link: LinkType;
};

export const Link = ({ link }: Props): JSX.Element => (
  <a href={`${link.link}`}>{link.text}</a>
);
