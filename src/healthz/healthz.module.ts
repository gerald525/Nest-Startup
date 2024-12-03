import { Module } from '@nestjs/common';
import { HealthzService } from './healthz.service';
import { HealthzController } from './healthz.controller';

@Module({
  controllers: [HealthzController],
  providers: [HealthzService],
})
export class HealthzModule {}
