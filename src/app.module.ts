import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { LogController } from './log/log.controller';
import { LogService } from './log/log.service';
import { LogModule } from './log/log.module';

/**
 *根模块，必须。可以导入其他模块。具有Module装饰器的类称之为模块。
 *
 * @export
 * @class AppModule
 */
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'issue',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true, //控制台输出日志
        }),
        UserModule,
        ArticleModule,
        LogModule,
    ], //导入模块所需的导入模块列表
    controllers: [AppController, LogController], //必须创建的一组控制器
    providers: [AppService, LogService], //由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
})
export class AppModule {}
