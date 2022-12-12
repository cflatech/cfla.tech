import { Article } from "./article.entity";
import { Id } from "./id/id.value-object";

export type ArticlesRepositoryInterface = {
  find(id: Id): Promise<Article | null>;
  getPublished(database_id: string): Promise<Article[]>;
};

export const ArticlesRepositoryInterfaceToken = "ArticlesRepositoryInterface";
