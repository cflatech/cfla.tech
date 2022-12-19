import { Article } from "./article.entity";
import { Id } from "./id/id.value-object";

export interface ArticleRepositoryInterface {
  find(id: Id): Promise<Article | null>;
  getPublished(): Promise<Article[]>;
}

export const ArticleRepositoryInterfaceToken = "ArticleRepositoryInterface";
