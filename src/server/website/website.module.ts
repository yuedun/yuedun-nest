import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { default as Website } from './website.entity';
import { LoggerModule } from '../../libs/mylog.module';
import { WebsiteAPIController } from './website.api.controller';

const websiteProviders = [
    {
        provide: 'WebsiteRepository',
        useValue: Website,
    },
];

@Module({
    imports: [LoggerModule],
    providers: [WebsiteService, ...websiteProviders],
    controllers: [WebsiteController, WebsiteAPIController],
    exports: [WebsiteService, ...websiteProviders], // 导出以后才能被其他模块导入
})
export class WebsiteModule {}
