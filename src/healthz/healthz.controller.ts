import { Controller } from '@nestjs/common';
import { HealthzService } from './healthz.service';

@Controller()
export class HealthzController {
  constructor(private readonly healthzService: HealthzService) {}
}
