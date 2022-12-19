import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ArticlesModule } from "./articles/articles.module";
import { CacheModule } from "./cache/cache.module";

@Module({
  imports: [
    ArticlesModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    CacheModule,
  ],
})
export class AppModule {}
