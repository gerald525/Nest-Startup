import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH, EXPAND_VARIABLE } from './app.env';

import { HealthzModule } from './healthz/healthz.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: EXPAND_VARIABLE,
      envFilePath: ENV_FILE_PATH
    }),
    HealthzModule,
    TypeormModule,
    CatsModule,
    AdminModule,
    AccountModule,
  ]
})
export class AppModule {}
