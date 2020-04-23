import { Controller, Get, Param, Res, NotFoundException, UseFilters } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { MyLogger } from '../../libs/mylog.service';
import { Response } from 'express';
import * as nunjucks from 'nunjucks';
import { WebsiteDto } from './website.dto';
import { RouteExceptionFilter } from '../../middlewares/route-exception.filter';

/**
 * 用户端页面不加守卫
 * 后端接口加守卫@UseGuards(AuthGuard)
 */
@Controller('website')
@UseFilters(RouteExceptionFilter)
export class WebsiteController {
    private NunjuckEnv: nunjucks.Environment;
    constructor(
        private readonly websiteService: WebsiteService,
        private readonly logger: MyLogger,
    ) {
        logger.setContext('website.controller.ts');
        this.NunjuckEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
    }
}
