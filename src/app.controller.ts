import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from 'libs/mylog.service';

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
}
