import { Controller, Get, Param, Res, NotFoundException, UseFilters } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { MyLogger } from '../../libs/mylog.service';
import { Response } from 'express';
import * as nunjucks from 'nunjucks';
import { WebsiteDto } from './website.dto';
import { RouteExceptionFilter } from 'middlewares/route-exception.filter';

/**
 * 用户端页面不加守卫
 * 后端接口加守卫@UseGuards(AuthGuard)
 */
@Controller('website')
@UseFilters(new RouteExceptionFilter())
export class WebsiteController {
    private NunjuckEnv: nunjucks.Environment;
    constructor(
        private readonly websiteService: WebsiteService,
        private readonly logger: MyLogger,
    ) {
        logger.setContext('website.controller.ts');
        this.NunjuckEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
    }

    @Get(':url')
    async findOne(@Param('url') url, @Res() res: Response): Promise<any> {
        this.logger.debug(url);
        const website = await this.websiteService.findOne(url);
        if (!website) {
            throw new NotFoundException('找不到该页面！');
        }
        const websiteVO: WebsiteDto = new WebsiteDto();
        websiteVO.content = website.content.split(',');
        // 使用服务端模板编译可以对每个子模板填充数据
        const contentArray = new Array<string>();
        for (const item of websiteVO.content) {
            const tmpl = this.NunjuckEnv.getTemplate(`${item}.njk`);
            const tmplStr = tmpl.render({ title: '字幕版' });
            contentArray.push(tmplStr);
        }
        // websiteVO.content = contentArray;
        return res.render('edu/website.njk', {
            title: website.name,
            website: websiteVO,
        });
    }
}
