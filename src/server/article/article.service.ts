import { Injectable, Inject } from '@nestjs/common';
import { default as Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @Inject('ArticleRepository')
        private readonly articleRepository: typeof Article,
    ) {}

    async findAll(): Promise<Article[]> {
        const list = await this.articleRepository.findAll();
        return list;
    }
}
