import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'issue',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
