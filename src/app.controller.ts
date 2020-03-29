import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './libs/mylog.service';
import { Response } from 'express';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly myLogger: MyLogger,
    ) {
        // 设置日志上下文，输出结果为：[Nest] 1996   - 2020-02-21 11:22:03 AM   [app.controller.ts] >>>>>>>>>>app.controller.ts
        // 不设置输出为：[Nest] 1996   - 2020-02-21 11:22:03 AM  >>>>>>>>>>app.controller.ts
        myLogger.setContext('app.controller.ts');
    }

    @Get()
    root(): string {
        this.myLogger.log('>>>>>>>>>>app.controller.ts');
        return this.appService.root();
    }
    @Get('/index')
    index(@Res() res:Response): void {
        this.myLogger.log('>>>>>>>>>>app.controller.ts');
        return res.render('edu/layout3.njk', {
            title: "website.name",
            website: "websiteVO",
        });
    }
}
