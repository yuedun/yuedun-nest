import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { default as Article } from './article.entity';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    findAll(): Promise<Article[]> {
        return this.articleService.findAll();
    }
}
