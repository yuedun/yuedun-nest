import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nunjucks = require('nunjucks');
import { MyLogger } from './libs/mylog.service';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';
import { TransformInterceptor } from './middlewares/transform.interceptor';
import { AuthGuard } from './middlewares/auth.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    });
    app.useLogger(app.get(MyLogger));
    app.useGlobalGuards(new AuthGuard());
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
