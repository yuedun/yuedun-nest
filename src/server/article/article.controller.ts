import { Controller, Get, HttpService } from '@nestjs/common';
import { ArticleService } from './article.service';
import { default as Article } from './article.entity';
import { Observable } from 'rxjs';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly httpServiece: HttpService,
    ) { }

    @Get()
    findAll(): Promise<Article[]> | Observable<any> {
        return this.articleService.findAll();
    }
}
