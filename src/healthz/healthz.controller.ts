import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthzController {
  constructor(
    private readonly config: ConfigService,
    private readonly healthz: HealthCheckService,
    private readonly db_healthz: TypeOrmHealthIndicator,
    private readonly memory_healthz: MemoryHealthIndicator,
    private readonly micro_healthz: MicroserviceHealthIndicator,
  ) {}

  @Get()
  public async liveness() {
    return { message: 'ok' };
  }

  @Get('readiness')
  @HealthCheck()
  public async readiness() {
    const service_ping_checks: HealthIndicatorFunction[] = [
      () => this.db_healthz.pingCheck("postgres")
    ]

    return this.healthz.check(service_ping_checks);
  }
}
