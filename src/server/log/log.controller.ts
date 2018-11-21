import { Controller, Get } from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from './log.entity';

@Controller('log')
export class LogController {
    constructor(private readonly logService: LogService) { }

    @Get()
    async findAll(): Promise<Log[]> {
        return await this.logService.getLogs();
    }
    @Get('query')
    async findAllBySql(): Promise<Log[]> {
        return await this.logService.queryBySql();
    }
}
