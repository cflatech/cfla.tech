import { Item } from "./Item";
import { useArticleItems } from "../../../hooks/useArticleItems";

type Props = {
  page: number;
};

export const List = ({ page }: Props): JSX.Element | null => {
  const { items, isLoading } = useArticleItems(Number(page));

  if (isLoading) return null;
  if (items.length === 0) return null;

  return (
    <div data-testid="list">
      {items?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
