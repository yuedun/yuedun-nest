import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ArticleModule } from '../article/article.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ArticleModule], //每个模块都是一个共享模块。 一旦创建就被每个模块重复使用
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
