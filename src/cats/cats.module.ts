import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: 'ICatsService',
      useClass: CatsService,
    },
  ],
  exports: [
    "ICatsService",
    CatsService
  ]
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
