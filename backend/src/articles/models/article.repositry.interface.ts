import { Article } from "./article.entity";
import { Id } from "./id/id.value-object";

export type ArticlesRepositoryInterface = {
  find(id: Id): Promise<Article | null>;
  getPublished(): Promise<Article[]>;
};

export const ArticlesRepositoryInterfaceToken = "ArticlesRepositoryInterface";
