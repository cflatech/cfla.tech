import { Inject, Injectable } from "@nestjs/common";
import {
  ArticlesRepositoryInterface,
  ArticlesRepositoryInterfaceToken,
} from "./entities/article.repositry.interface";
import { Id } from "./valueObjects/id.valueObject";

@Injectable()
export class ArticlesService {
  #articleRepository: ArticlesRepositoryInterface;

  constructor(
    @Inject(ArticlesRepositoryInterfaceToken)
    articleRepository: ArticlesRepositoryInterface,
  ) {
    this.#articleRepository = articleRepository;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    this.#articleRepository.find(
      new Id("550e8400-e29b-41d4-a716-446655440000"),
    );
    return `This action returns a #${id} article`;
  }
}
