import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

// eslint-disable-next-line unicorn/import-style
import * as path from 'path';

import { CacheModule } from './cache/cache.module';
import ApiModule from './modules/api/api.module';
import configuration from '@core/app.config/config';
// eslint-disable-next-line import/order
import { dbSchema, siteSchema } from '@core/app.config/schema';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env`,
  load: [configuration],
  validationSchema: Joi.object({
    ...siteSchema,
    ...dbSchema
  })
});

// import { HeaderValidationMiddleware } from '@core/middleware/header-validation.middleware';
import { LoggerMiddleware } from '@core/middleware/logger.middleware';
import { DatabaseModule } from '@repo/database-module.module';

const imports = [
  envModule,
  I18nModule.forRoot({
    fallbackLanguage: 'en',
    loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
    resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver]
  }),
  DatabaseModule,
  JwtModule.register({ global: true }),
  ApiModule
];

if (process.env.CACHE_ENABLED === 'true') {
  imports.push(CacheModule);
}

@Module({
  imports,
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(HeaderValidationMiddleware).forRoutes();
  }
}
