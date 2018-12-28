import { Controller, Get, HttpService } from '@nestjs/common';
import { ArticleService } from './article.service';
import { default as Article } from './article.entity';
import { Observable } from 'rxjs';
import { MyLogger } from '../../libs/mylog.service';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly httpServiece: HttpService,
        private readonly logger: MyLogger,
    ) {}

    @Get()
    findAll(): Promise<Article[]> | Observable<any> {
        this.logger.log('>>>>>>>>>>>>>>');
        return this.articleService.findAll();
    }
}
