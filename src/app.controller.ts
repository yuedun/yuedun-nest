import { Controller, Get, Res, Param, NotFoundException, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './libs/mylog.service';
import { Response, Request } from 'express';
import { WebsiteService } from './server/website/website.service';

// 设置域名与数据库网站名的映射关系，可以直接通过域名获取到网站名，进而获取对应网站的内容
const WebsiteMap = {
    'nest.hopefly.top': 'yuedun',
}
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

    @Get('/')
    async index(@Req() request: Request, @Res() res: Response): Promise<any> {
        this.logger.log('>>>>>>>>>>app.controller.ts');
        let host = request.hostname;
        let website = WebsiteMap[host];// 由域名获取服务
        let url = request.params.url || 'index';
        this.logger.debug("website:" + website);
        this.logger.debug("url:" + url);
        this.logger.debug(request.hostname)
        const resData = await this.websiteService.findOneData(website, url);
        // this.logger.debug(">>>:" + JSON.stringify(resData))
        if (!resData) {
            throw new NotFoundException('找不到该页面！');
        }
        return res.render(resData.website.category + '/index.njk', {
            title: resData.page.name,
            icon: resData.website.icon,
            keywords: resData.page.keywords,
            description: resData.page.description,
            category: resData.website.category,
            page: resData.page,
        });
    }
    @Get('/template')
    template(@Res() res: Response): void {
        this.logger.log('>>>>>>>>>>app.controller.ts');
        return res.render('edu/layout3.njk', {
            title: "website.name",
            website: "websiteVO",
        });
    }

    @Get('/:url')
    async findOne(@Req() request: Request, @Res() res: Response): Promise<any> {
        let host = request.hostname;
        let website = WebsiteMap[host];// 由域名获取服务
        let url = request.params.url;
        this.logger.debug("website:" + website);
        this.logger.debug("url:" + url);
        this.logger.debug(request.hostname)
        const resData = await this.websiteService.findOneData(website, url);
        // this.logger.debug(">>>:" + JSON.stringify(resData))
        if (!resData) {
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
        return res.render(resData.website.category + '/index.njk', {
            title: resData.page.name,
            icon: resData.website.icon,
            keywords: resData.page.keywords,
            description: resData.page.description,
            category: resData.website.category,
            page: resData.page,
        });
    }
}
