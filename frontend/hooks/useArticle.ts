import useSWR from "swr";
import axios from "axios";
import { Article, ArticleBlock } from "../types/article";

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
  const data: ArticleResponse = await (
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`)
  ).data;

  const article: Article = {
    id: data.id.value,
    title: data.title,
    date: data.date,
    blocks: data.blocks,
  };
  return article;
};

const isArticle = (
  article: Article | undefined,
  error: boolean,
  isLoading: boolean,
): article is Article => {
  if (error) {
    return false;
  }

  if (isLoading) {
    return false;
  }

  return true;
};

export const useArticle = (
  id: string,
): { article: Article | null; error: boolean; isLoading: boolean } => {
  const { data: article, error, isLoading } = useSWR(`/article/${id}`, fetcher);

  if (!isArticle(article, error, isLoading)) {
    return { article: null, error: !!error, isLoading };
  }

  return {
    article,
    error: false,
    isLoading: false,
  };
};
