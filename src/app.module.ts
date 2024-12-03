import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV_FILE_PATH, EXPAND_VARIABLE } from './app.env';

import { HealthzModule } from './healthz/healthz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: EXPAND_VARIABLE,
      envFilePath: ENV_FILE_PATH
    }),
    HealthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
