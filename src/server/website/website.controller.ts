import { Controller, Get, Param, Res } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { MyLogger } from '../../libs/mylog.service';
import { Response } from 'express';
import { CreateWebsiteDto } from './website.dto';

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

    @Get(':url')
    async findOne(@Param('url') url, @Res() res: Response): Promise<void> {
        this.logger.debug(url);
        let website = await this.websiteService.findOne(url);
        let websiteVO: CreateWebsiteDto = new CreateWebsiteDto();
        websiteVO.content = website.content.split(',');
        return res.render('website.njk', {
            title: website.name,
            website: websiteVO,
        });
    }
}
