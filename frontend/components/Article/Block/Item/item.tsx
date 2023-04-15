/* eslint-disable jsx-a11y/anchor-is-valid */
import { Item as ItemType } from "../../../../types/article";
import { Link } from "./Link";
import { Text } from "./Text";

type Props = {
  item: ItemType;
};

export function Item({ item }: Props): JSX.Element | null {
  if (item.type === "text") return <Text text={item} />;
  if (item.type === "link") return <Link link={item} />;
  return null;
}
