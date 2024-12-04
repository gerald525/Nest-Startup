import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller({ host: 'admin.example.com' })
//we need to make sure this url is configured in DNS server
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  index(): string {
    return 'admin page';
  }
}
