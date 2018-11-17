import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Article } from 'article/article.entity';
import { ArticleService } from 'article/article.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly articleService: ArticleService,
    ) {}

    async findAll(): Promise<{ user: User[]; article?: Article[] }> {
        const userList = await this.userRepository.find();
        const articleList = await this.articleService.findAll();
        return {
            user: userList,
            article: articleList,
        };
    }
}
