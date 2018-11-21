import { Controller, Get, HttpException, HttpStatus, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Article } from '../article/article.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Render('index.njk')
    findAll(): Promise<{ user: User[]; article?: Article[] }> {
        // throw new HttpException('Forbbidden', HttpStatus.BAD_REQUEST)
        return this.userService.findAll();
    }
}
