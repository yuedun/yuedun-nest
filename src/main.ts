import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import nunjucks = require('nunjucks');
import { MyLogger } from './libs/mylog.service';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { TransformInterceptor } from './middlewares/transform.interceptor';
import { join } from 'path';
import { AuthGuard } from 'middlewares/auth.guard';

async function bootstrap() {
    // const server = express();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
    app.useLogger(app.get(MyLogger));
    // app.useGlobalGuards(new AuthGuard()); // 守卫放在每个需要验证权限的路由上，并不是所有路由都需要验证权限，比如对外提供的接口
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useStaticAssets(join(__dirname + '/public')); // NestFactory.create需要加泛型参数<NestExpressApplication>
    app.setBaseViewsDir(join(__dirname, '..', 'views')); // 修改模板文件后立马生效，否则需要重启服务，nunjucks watch参数也有相同作用
    nunjucks.configure('views', {
        ext: 'njk',
        autoescape: true,
        express: app,
        watch: true,
    });
    await app.listen(3004, () => {
        const logger = new MyLogger('main.ts');
        logger.debug(process.env.NODE_ENV, 'main.ts');
        logger.log('server start on localhost:3004');
    });
}
bootstrap();
