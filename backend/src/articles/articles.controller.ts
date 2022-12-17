import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(":id")
  find(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }

  @Get("")
  getPublished(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.articlesService.getPublished(page);
  }
}
