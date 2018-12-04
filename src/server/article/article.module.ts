import { Module, HttpModule } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { default as Article } from './article.entity';
import { LoggerModule } from '../../libs/mylog.module';

const articleProviders = [
	{
		provide: 'ArticleRepository',
		useValue: Article,
	},
];

@Module({
	imports:[HttpModule, LoggerModule],
    providers: [ArticleService, ...articleProviders],
    controllers: [ArticleController],
    exports: [ArticleService,...articleProviders], // 导出以后才能被其他模块导入
})
export class ArticleModule {}
