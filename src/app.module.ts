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
import { ConfigModule } from '@nestjs/config';
// import { ConfigModule } from './config/config.module';
import { WebsiteModule } from './server/website/website.module';

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
        ConfigModule.forRoot(),
        WebsiteModule,
        // HttpModule,
    ], // 导入模块所需的导入模块列表
    controllers: [AppController], // 必须创建的一组控制器
    providers: [AppService,  MyLogger], // 由 Nest 注入器实例化的提供者，并且可以在整个模块中共享
})
export class AppModule implements NestModule {
    // 中间件模块在此处添加，可以给某一部分增加中间件，如果要全局增加则在main.ts中使用app.use添加
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            // .with('中间件参数')
            .forRoutes('/*');
    }
}
