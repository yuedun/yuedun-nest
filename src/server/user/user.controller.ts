import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Render,
    HttpService,
} from '@nestjs/common';
import { UserService } from './user.service';
import { default as User } from './user.entity';
import { default as Article } from '../article/article.entity';
import { MyLogger } from '../../libs/mylog.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: MyLogger,
        private readonly httpServiece: HttpService,
    ) { }

    @Get()
    @Render('index.njk')
    findAll(): Promise<{ user: User[]; article?: Article[] }> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        // this.httpServiece.get('').toPromise();
        try {
            throw new Error('sdkghfdi');
        } catch (error) {
            this.logger.error(error.message, error.stack);
        }
        return this.userService.findAll();
    }

    @Get('articles')
    @Render('articles.njk')
    async findArticlesByUser(): Promise<any[]> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        // this.httpServiece.get('').toPromise();
        let articles = await this.userService.findArticlesByUser(2);
        console.log(">>>articles:", articles.length);

        return [{title:"sdg", content:"",id:12, createdAt:new Date(), updatedAt:new Date(), user_id:23, status:2}]
    }
}
