import { Controller, Get, Param } from "@nestjs/common";
import { ArticlesService } from "./articles.service";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(":id")
  find(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }
}
