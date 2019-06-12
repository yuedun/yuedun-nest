import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from 'libs/mylog.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly myLogger: MyLogger
    ) {}

    @Get()
    root(): string {
        this.myLogger.error(">>>>jhg>>>>>>", "dfgd");
        return this.appService.root();
    }
}
