import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticlesModule } from "./articles/articles.module";

@Module({
  imports: [
    ArticlesModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
