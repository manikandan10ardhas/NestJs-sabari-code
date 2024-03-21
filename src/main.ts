/* istanbul ignore file */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nMiddleware, I18nValidationPipe } from 'nestjs-i18n';

import { AppModule } from './app.module';
import { appConfig } from '@core/app.config';
import WrapResponseInterceptor from '@core/interceptors/wrap-response.interceptor';
import {
  BadRequestExceptionFilter,
  ConflictExceptionFilter,
  ForBiddenExceptionFilter,
  HttpExceptionFilter,
  I18nValidationExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter
} from '@filters/index';

async function bootstrap() {
  const APP_CONFIG = appConfig();
  const app = await NestFactory.create(AppModule, {
    logger: APP_CONFIG.isProduction ? ['error', 'warn'] : ['error', 'warn', 'debug'] //false for disabling logs
  });
  // Global level versioning
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   prefix: 'v',
  // });
  app.use(I18nMiddleware);

  app.useGlobalPipes(new I18nValidationPipe());

  const configService = app.get(ConfigService);
  if (configService.get('enableCors')) {
    app.enableCors({
      origin: configService.get('allowedOrigins'),
      credentials: true
    });
  }

  if (APP_CONFIG.isDev === true || APP_CONFIG.isLocal === true || APP_CONFIG.isQA === true) {
    const config = new DocumentBuilder()
      .setTitle('NestJS Project')
      .setDescription('NestJS Project API description')
      .setVersion(configService.get('apiReleaseVersion') as string)
      .addBearerAuth()
      .addTag('Auth')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new ConflictExceptionFilter(),
    new ForBiddenExceptionFilter(),
    new HttpExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new I18nValidationExceptionFilter(),
    new NotFoundExceptionFilter()
  );

  app.useGlobalInterceptors(new WrapResponseInterceptor(configService));

  const PORT = configService.get('httpPort');

  await app.listen(PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
bootstrap();
