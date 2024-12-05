import { Controller, Get, Inject } from '@nestjs/common';
import { AdminService } from './admin.service';

// @Controller({ host: 'admin.example.com' })
//we need to make sure this url is configured in DNS server
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject('AdminFactoryService')
    private readonly factoryService: AdminService,
  ) {}

  @Get()
  index(): string {
    return 'index admin';
  }
}
