import { CacheInterceptor } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

export const CacheInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: CacheInterceptor,
};
