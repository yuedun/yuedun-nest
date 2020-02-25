import { Module } from '@nestjs/common';
import { databaseProviders } from './sequelize.providers';
import { ConfigModule } from 'config/config.module';

@Module({
    imports:[ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
