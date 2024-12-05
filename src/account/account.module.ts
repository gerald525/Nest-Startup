import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
