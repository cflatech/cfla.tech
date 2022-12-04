import { Inject, Injectable } from "@nestjs/common";
import {
  ArticlesRepositoryInterface,
  ArticlesRepositoryInterfaceToken,
} from "./models/article.repositry.interface";
import { Id } from "./models/id/id.value-object";

@Injectable()
export class ArticlesService {
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
}
