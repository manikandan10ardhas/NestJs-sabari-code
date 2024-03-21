import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { REDIS_CONNECTION_MAX_RETRY } from '@constants/index';

const imports = [];
// eslint-disable-next-line sonarjs/no-small-switch
switch (process.env.CACHE_LIBRARY_NAME) {
  default:
  case 'redis': {
    imports.push(
      RedisModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          config: {
            url: configService.get<string>('cachingLibrary.clientUrl'),
            password: configService.get<string>('cachingLibrary.password'),
            retryStrategy(count) {
              return count <= REDIS_CONNECTION_MAX_RETRY ? count : undefined;
            },
            onClientCreated(client) {
              client.on('error', (err) => {
                console.log(err);
              });
              client.on('ready', () => {});
            }
          }
        })
      })
    );
    break;
  }
}

@Module({
  imports: imports
})
export class CacheModule {}
