import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Item } from "./Item";

// TODO: バックエンドと型を共有する仕組みを入れる
type ArticleResponse = {
  id: {
    value: string;
  };
  title: string;
  content: {
    type: string;
    text: string;
  }[];
  date: string;
  tag: string[];
};

// TODO: システム内で共通の型を別の場所に定義する
type Article = {
  id: string;
  title: string;
  date: string;
  content: {
    type: string;
    text: string;
  }[];
};

const fetcher = async (url: string) => {
  const articles: ArticleResponse[] = await (
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`)
  ).data;

  const items: Article[] = articles.map((article) => ({
    id: article.id.value,
    title: article.title,
    date: article.date,
    content: article.content,
  }));
  return items;
};

export const List = (): JSX.Element | null => {
  // TODO: hookをカスタムhookに切り出す
  const router = useRouter();
  const page = router.query.page ?? 1;
  const {
    data: items,
    error,
    isLoading,
  } = useSWR(`/articles?page=${page}`, fetcher);

  if (!router.isReady) return null;
  if (error) return null;
  if (isLoading) return null;

  return (
    <div data-testid="list">
      {items?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
