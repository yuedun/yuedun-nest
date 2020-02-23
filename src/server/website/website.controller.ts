import { Controller, Get, UseGuards } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { default as Article } from './website.entity';
import { Observable } from 'rxjs';
import { MyLogger } from '../../libs/mylog.service';
import { AuthGuard } from 'middlewares/auth.guard';

/**
 * 用户端页面不加守卫
 * 后端接口加守卫@UseGuards(AuthGuard)
 */
@Controller('website')
export class WebsiteController {
    constructor(
        private readonly websiteService: WebsiteService,
        private readonly logger: MyLogger
    ) {
        logger.setContext('website.controller.ts');
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll(): Promise<Article[]> | Observable<any> {
        this.logger.debug('>>>>>>>>>>>>>>');
        return this.websiteService.findAll();
    }
}
