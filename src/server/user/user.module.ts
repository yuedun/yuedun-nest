import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { default as User } from './user.entity';
import { ArticleModule } from '../article/article.module';

const userProviders = [
	{
		provide: 'UserRepository',
		useValue: User,
	},
];
@Module({
    imports: [ArticleModule], // 每个模块都是一个共享模块。 一旦创建就被每个模块重复使用
    providers: [UserService, ...userProviders],
    controllers: [UserController],
    exports:[...userProviders]
})
export class UserModule {}
