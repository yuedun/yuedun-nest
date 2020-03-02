import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import { MyLogger } from './libs/mylog.service';
import { RouteExceptionFilter } from './middlewares/route-exception.filter';
import { TransformInterceptor } from './middlewares/transform.interceptor';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    // const server = express();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
    app.useLogger(app.get(MyLogger));
    app.enableCors(); // 允许跨域调用
    // app.useGlobalGuards(new AuthGuard()); // 守卫放在每个需要验证权限的路由上，并不是所有路由都需要验证权限，比如对外提供的接口
    // app.useGlobalFilters(new RouteExceptionFilter()); // 过滤器 路由和接口设置不同的异常过滤器
    app.useGlobalInterceptors(new TransformInterceptor()); // 拦截器
    app.useStaticAssets(join(__dirname, '..', 'public')); // NestFactory.create需要加泛型参数<NestExpressApplication>
    app.setBaseViewsDir(join(__dirname, '..', 'views')); // 修改模板文件后立马生效，否则需要重启服务，nunjucks watch参数也有相同作用
    app.use(cookieParser()); // 全局中间件，局部中间件可再app.module.ts中配置
    nunjucks.configure('views', {
        // ext: 'njk',
        autoescape: true,
        express: app,
        watch: true,
    });
    await app.listen(3004, () => {
        const logger = new MyLogger('main.ts');
        logger.debug(process.env.NODE_ENV, 'main.ts');
        logger.log('server start on http://localhost:3004');
    });
}
bootstrap();
