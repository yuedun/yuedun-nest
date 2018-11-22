import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nunjucks = require('nunjucks');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useStaticAssets(__dirname + '/public');
    app.setBaseViewsDir(__dirname + '/views');//修改模板文件后立马生效，否则需要重启服务，nunjucks watch参数也有相同作用
    nunjucks.configure('views', { autoescape: true, express: app, watch: true });
    await app.listen(3000);
}
bootstrap();
