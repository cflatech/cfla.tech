import { CacheModule as NestCacheModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CacheInterceptorProvider } from "./providers/cache-interceptor.provider";

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get("CACHE_TTL"),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheInterceptorProvider],
})
export class CacheModule {}
