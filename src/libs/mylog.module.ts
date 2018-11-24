import { Module } from '@nestjs/common';
import { MyLogger } from './mylog.service';

@Module({
    providers: [MyLogger],
    exports: [MyLogger],
})
export class LoggerModule { };