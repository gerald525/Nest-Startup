import { Global, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminDevelopmentService } from './admin.development.service';
import { AdminProductionService } from './admin.production.service';

@Global()
@Module({
  imports: [],
  controllers: [AdminController],
  providers: [
    //default provider
    AdminService,

    // custom provider
    {
      provide: 'AdminCustomService',
      useClass:
        process.env.NODE_ENV === 'development'
          ? AdminDevelopmentService
          : AdminProductionService,
    },

    // factory provider
    {
      provide: 'AdminFactoryService',
      useFactory: (...args) => {
        return AdminService;
      },
      inject: [
        AdminService,
        { token: 'AdminCustomService', optional: true },
        { token: AdminDevelopmentService, optional: true },
        { token: 'someservice', optional: true },
      ],
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
