import { Controller, Get, UseGuards, Post, Req, Body, Query, UseFilters,  } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { Observable } from 'rxjs';
import { MyLogger } from '../../libs/mylog.service';
import { AuthGuard } from '../../middlewares/auth.guard';
import Website from './website.entity';
import { WebsiteDto } from './website.dto';
import { APIExceptionFilter } from 'middlewares/api-exception.filter';

/**
 * 用户端页面不加守卫
 * 后端接口加守卫@UseGuards(AuthGuard)
 */
@Controller('api/website')
@UseFilters(new APIExceptionFilter())
export class WebsiteAPIController {
    constructor(
        private readonly websiteService: WebsiteService,
        private readonly logger: MyLogger,
    ) {
        logger.setContext('website.controller.ts');
    }

    // 列表
    @Get()
    @UseGuards(AuthGuard)
    findAll(@Query() query): Promise<Website[]> | Observable<Website[]> {
        this.logger.debug(query);
        return this.websiteService.findAll(Number(query.offset), Number(query.limit));
    }

    // 新增
    @Post('/create')
    @UseGuards(AuthGuard)
    create(@Body() createWebSiteDto: WebsiteDto): Promise<Website> | Observable<Website> {
        this.logger.debug(createWebSiteDto);
        return this.websiteService.create(createWebSiteDto);
    }
    // 修改
    @Post('/update')
    @UseGuards(AuthGuard)
    update(@Body() createWebSiteDto: WebsiteDto): Promise<[number, Website[]]> | Observable<Website> {
        this.logger.debug(createWebSiteDto);
        return this.websiteService.update(createWebSiteDto);
    }
}
