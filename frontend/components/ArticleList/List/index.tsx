import { useRouter } from "next/router";
import { Item } from "./Item";
import { useArticleItems } from "../../../hooks/useArticleItems";

export const List = (): JSX.Element | null => {
  const router = useRouter();
  const page = router.query.page ?? 1;

  const { items, isLoading } = useArticleItems(Number(page));

  if (!router.isReady) return null;
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
