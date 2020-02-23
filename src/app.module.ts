import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { ArticleModule } from './server/article/article.module';
import { LogModule } from './server/log/log.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './libs/mylog.module';
import { MyLogger } from './libs/mylog.service';
import { ConfigModule } from 'config/config.module';
import { WebsiteModule } from 'server/website/website.module';

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
        LoggerModule,
        ConfigModule,
        WebsiteModule,
        // HttpModule,
    ], // 导入模块所需的导入模块列表
    controllers: [AppController], // 必须创建的一组控制器
    providers: [AppService,  MyLogger], // 由 Nest 注入器实例化的提供者，并且可以在整个模块中共享
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            // .with('中间件参数')
            .forRoutes('/*');
    }
}
