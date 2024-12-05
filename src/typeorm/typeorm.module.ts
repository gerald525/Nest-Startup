import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModule as NestJSTypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({})
export class TypeormModule {
  public static forRoot(
    options: Partial<PostgresConnectionOptions> = {},
  ): DynamicModule {
    return {
      imports: [
        NestJSTypeOrmModule.forRootAsync({
          useFactory: async (config: ConfigService) => {
            const final_options: TypeOrmModuleOptions = {
              type: 'postgres',
              host: config.getOrThrow<string>('DB_HOST'),
              port: config.getOrThrow<number>('DB_PORT'),
              username: config.getOrThrow<string>('DB_USERNAME'),
              password: config.getOrThrow<string>('DB_PASSWORD'),
              database: `${process.env.NODE_ENV}_${config.getOrThrow<string>('DB_DATABASE')}`,
              entities: [__dirname + '/../**/*.entity.ts'],
              migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
              migrationsRun: false,
              synchronize: false,
              logging: JSON.parse(config.getOrThrow<string>('DB_LOGGING')),
							...options
            };

            await createDatabase({
              ifNotExist: true,
              options: final_options as DataSourceOptions,
            });

            return final_options;
          },
          inject: [ConfigService],
        }),
      ],
      module: TypeormModule,
    };
  }
}
