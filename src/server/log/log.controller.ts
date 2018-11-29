import { Controller, Get, UseFilters, HttpException } from '@nestjs/common';
import { LogService } from './log.service';
import { default as Log } from './log.entity';

@Controller('log')
export class LogController {
    constructor(private readonly logService: LogService) { }

    @Get()
    async findAll(): Promise<Log[]> {
        // throw new HttpException('httpexception', 500);
        return await this.logService.getLogs(1);
    }
    @Get('query')
    async findAllBySql(): Promise<Log[]> {
        return await this.logService.queryBySql();
    }
}
