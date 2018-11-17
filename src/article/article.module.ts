import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleService, ArticleController],
    controllers: [ArticleController],
    exports: [ArticleService], //导出以后才能被其他模块导入
})
export class ArticleModule {}
