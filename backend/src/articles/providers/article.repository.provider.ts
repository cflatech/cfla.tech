import { ArticlesRepositoryInterfaceToken } from "../models/article.repositry.interface";
import { ArticlesRepository } from "../repositories/article.repository";

export const ArticleRepositoryProvider = {
  provide: ArticlesRepositoryInterfaceToken,
  useClass: ArticlesRepository,
};
