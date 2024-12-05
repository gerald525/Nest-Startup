import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { AdminService } from 'src/admin/admin.service';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly adminService: AdminService,
    @Inject('ICatsService') private readonly iCatsService: CatsService,
  ) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'no-store')
  create(@Body() createCatDto: CreateCatDto, @Res() res: Response): string {
    this.iCatsService.create(createCatDto);
    (res as any).status(HttpStatus.CREATED).send('This action adds a new cat');
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.iCatsService.findAll();
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirectTo(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get('async')
  async findAsync(): Promise<any[]> {
    return [];
  }

  @Get('observable')
  findObservabla(): Observable<string> {
    let observable = new Observable<string>((subscriber) => {
      subscriber.next('1');
      subscriber.next('2');
      subscriber.next('3');
      setTimeout(() => {
        subscriber.next('4efef');
        subscriber.complete();
      }, 1000);
    });

    observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });

    return observable;
  }

  @Get('docs')
  @Redirect('https://nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5')
      return { url: 'https://docs.nestjs.com/v5/' };
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  updateOne(@Param('id') id: string) {
    return `This action update a #${id} cat`;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
