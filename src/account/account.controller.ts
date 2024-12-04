import { Controller, Get, HostParam } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller(':account.example.com')
// we need to make sure that wildcard subdomain is supported from DNS
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getInfo(@HostParam('account') account: string) {
     return account;
  }
}
