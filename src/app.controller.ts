import { Controller, Get, Query, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    root(@Query() query): string {
        console.log(query.aaa);
        console.log('>>>>root');

        return this.appService.root();
    }
    @Get()
    index(): string {
        console.log('>>>>>>>index');

        return this.appService.root();
    }
}
