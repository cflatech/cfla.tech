import axios from "axios";
import useSWR from "swr";
import { Article, ArticleBlock } from "../types/article";

// TODO: ここの型もなんとかする
export type ArticleResponse = {
  id: {
    value: string;
  };
  title: string;
  blocks: ArticleBlock[];
  date: string;
  tag: string[];
};

const fetcher = async (url: string) => {
  const articles: ArticleResponse[] = await (
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`)
  ).data;

  const items: Article[] = articles.map((article) => ({
    id: article.id.value,
    title: article.title,
    date: article.date,
    blocks: article.blocks,
  }));
  return items;
};

export const useArticleItems = (
  page: number,
): { items: Article[]; isLoading: boolean } => {
  const {
    data: items,
    error,
    isLoading,
  } = useSWR(`/articles?page=${page}`, fetcher);

  if (isLoading) return { items: [], isLoading: true };
  if (error) return { items: [], isLoading: false };

  return { items: items ?? [], isLoading };
};
