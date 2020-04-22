import { Controller, Get, Res, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './libs/mylog.service';
import { Response } from 'express';
import { WebsiteService } from './server/website/website.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly logger: MyLogger,
        private readonly websiteService: WebsiteService,
    ) {
        // 设置日志上下文，输出结果为：[Nest] 1996   - 2020-02-21 11:22:03 AM   [app.controller.ts] >>>>>>>>>>app.controller.ts
        // 不设置输出为：[Nest] 1996   - 2020-02-21 11:22:03 AM  >>>>>>>>>>app.controller.ts
        logger.setContext('app.controller.ts');
    }

    @Get()
    index(@Res() res:Response): void {
        this.logger.log('>>>>>>>>>>app.controller.ts');
        return res.render('edu/layout3.njk', {
            title: "website.name",
            website: "websiteVO",
        });
    }
    
    @Get(':url')
    async findOne(@Param('url') url, @Res() res: Response): Promise<any> {
        this.logger.debug("url:" + url);
        const website = await this.websiteService.findOneData(url);
        this.logger.debug("website:" + JSON.stringify(website))
        if (!website) {
            throw new NotFoundException('找不到该页面！');
        }
        // const websiteVO: WebsiteDto = new WebsiteDto();
        // 使用服务端模板编译可以对每个子模板填充数据
        // const componentsArray = new Array<string>();
        // for (const item of websiteVO.components) {
        //     const tmpl = this.NunjuckEnv.getTemplate(`${item}.njk`);
        //     const tmplStr = tmpl.render({ title: '字幕版' });
        //     componentsArray.push(tmplStr);
        // }
        // websiteVO.components = componentsArray;
        return res.render('edu/index.njk', {
            title: website.name,
            icon: website.icon,
            keywords: website.keywords,
            description: website.description,
            website,
        });
    }
}
