import { Controller, Get, Param, Query } from "@nestjs/common";
import { ArticlesService } from "./articles.service";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(":id")
  find(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }

  @Get("")
  getPublished(@Query("page") page = 1) {
    return this.articlesService.getPublished(page);
  }
}
