import { Inject, Injectable } from "@nestjs/common";
import {
  ArticlesRepositoryInterface,
  ArticlesRepositoryInterfaceToken,
} from "./models/article.repositry.interface";
import { Id } from "./models/id/id.value-object";

@Injectable()
export class ArticlesService {
  #perPage = 3;

  #articleRepository: ArticlesRepositoryInterface;

  constructor(
    @Inject(ArticlesRepositoryInterfaceToken)
    articleRepository: ArticlesRepositoryInterface,
  ) {
    this.#articleRepository = articleRepository;
  }

  async findOne(id: string) {
    const article = await this.#articleRepository.find(new Id(id));

    return article;
  }

  async getPublished(pageNum: number) {
    const artilces = await this.#articleRepository.getPublished();

    const sorted = artilces.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      if (aDate > bDate) {
        return -1;
      }

      if (aDate < bDate) {
        return 1;
      }

      return 0;
    });
    return sorted.slice((pageNum - 1) * this.#perPage, pageNum * this.#perPage);
  }
}
