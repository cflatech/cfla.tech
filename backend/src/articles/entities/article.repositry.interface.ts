import { Id } from "../valueObjects/id.valueObject";
import { Article } from "./article.entity";

export type ArticlesRepositoryInterface = {
  find(id: Id): Promise<Article | null>;
};

export const ArticlesRepositoryInterfaceToken = "ArticlesRepositoryInterface";
