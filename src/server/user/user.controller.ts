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
    ) {}

    @Get()
    @Render('index.njk')
    findAll(): Promise<{ user: User[]; article?: Article[] }> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        try {
            throw new Error('sdkghfdi');
        } catch (error) {
            this.logger.error(error.message, error.stack);
        }
        return this.userService.findAll();
    }
}
