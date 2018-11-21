import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const nunjucks = require('nunjucks');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useStaticAssets(__dirname + '/public');
    nunjucks.configure('views', { autoescape: true, express: app });
    await app.listen(3000);
}
bootstrap();
