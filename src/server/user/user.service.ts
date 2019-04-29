import { Injectable, Inject } from '@nestjs/common';
import { default as User } from './user.entity';
import { default as Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: typeof User,
        private readonly articleService: ArticleService,
    ) {}

    async findAll(): Promise<{ user: User[]; article?: Article[] }> {
        const userList = await this.userRepository.findAll();
        const articleList = await this.articleService.findAll();
        return {
            user: userList,
            article: articleList,
        };
    }
    async findArticlesByUser(usreId:number): Promise<Article[]> {
        const userList = await this.userRepository.findByPk(usreId, {include:[Article]});
        const articleList = userList.articles;
        return articleList;
    }
}
