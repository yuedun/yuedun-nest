import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nunjucks = require('nunjucks');
import { MyLogger } from './libs/mylog.service';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { TransformInterceptor } from './middlewares/transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    });
    app.useLogger(app.get(MyLogger));
    // app.useGlobalGuards(new AuthGuard());//守卫放在每个需要验证权限的路由上，并不是所有路由都需要验证权限，比如对外提供的接口
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useStaticAssets(__dirname + '/public');
    app.setBaseViewsDir(__dirname + '/views');//修改模板文件后立马生效，否则需要重启服务，nunjucks watch参数也有相同作用
    nunjucks.configure('views', { autoescape: true, express: app, watch: true });
    await app.listen(3000, ()=>{
        const logger = new MyLogger();
        logger.log('server start on localhost:3000');
    });
}
bootstrap();
