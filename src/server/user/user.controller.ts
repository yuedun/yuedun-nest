import { Controller, Get, Render, HttpService, Res, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { default as User } from './user.entity';
import { default as Article } from '../article/article.entity';
import { MyLogger } from '../../libs/mylog.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: MyLogger,
        private readonly httpServiece: HttpService,
    ) { }

    @Get()
    async findAll(@Res() res: Response): Promise<any> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        // this.httpServiece.get('').toPromise();
        try {
            // throw new Error('sdkghfdi');
        } catch (error) {
            this.logger.error(error.message, error.stack);
        }
        const users = await this.userService.findAll();
        return res.render('index.njk', {
            users,
        });
    }

    // 登录
    @Get('login')
    login(): Promise<string> {
        try {
            // throw new Error('sdkghfdi');
        } catch (error) {
            this.logger.error(error.message, error.stack);
        }
        return Promise.resolve('odfjg98rthnoiehj9gwn9hterbniethj');
    }

    @Get('articles')
    async findArticlesByUser(@Res() res: Response): Promise<any> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        // this.httpServiece.get('').toPromise();
        const articles = await this.userService.findArticlesByUser(2);
        return res.render('articles.njk', {
            title: '标题',
            articles,
        });
    }
}
