import { ArticleRepositoryInterfaceToken } from "../models/article.repositry.interface";
import { ArticleRepository } from "../repositories/article.repository";

export const ArticleRepositoryProvider = {
  provide: ArticleRepositoryInterfaceToken,
  useClass: ArticleRepository,
};
