import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './server/user/user.module';
import { ArticleModule } from './server/article/article.module';
import { LogController } from './server/log/log.controller';
import { LogService } from './server/log/log.service';
import { LogModule } from './server/log/log.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

/**
 * 根模块，必须。可以导入其他模块。具有Module装饰器的类称之为模块。
 *
 * @export
 * @class AppModule
 */
@Module({
    imports: [
        DatabaseModule,
        UserModule,
        ArticleModule,
        LogModule,
    ], // 导入模块所需的导入模块列表
    controllers: [AppController, LogController], // 必须创建的一组控制器
    providers: [AppService, LogService], // 由 Nest 注入器实例化的提供者，并且可以在整个模块中共享
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
        .with("中间件参数")
            .forRoutes('/*')
    }
}
