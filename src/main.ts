import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
const nunjucks = require('nunjucks');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(logger);
    app.useStaticAssets(__dirname + '/public');
    nunjucks.configure('views', { autoescape: true, express: app });
    await app.listen(3000);
}
bootstrap();
