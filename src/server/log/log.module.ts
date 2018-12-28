import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { DatabaseModule } from '../../database/database.module';
import { default as Log } from './log.entity';

const logProviders = [
    {
        provide: 'LogRepository',
        useValue: Log,
    },
];
@Module({
    imports: [DatabaseModule],
    controllers: [LogController],
    providers: [LogService, ...logProviders],
    exports: [...logProviders],
})
export class LogModule {}
