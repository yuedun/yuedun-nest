import { Injectable, Inject } from '@nestjs/common';
import { Log } from './log.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class LogService {
    constructor(
        @Inject('LogRepository') private readonly logRepository: typeof Log,
        @Inject('Sequelize') private readonly sequelize: Sequelize
    ) { }
    async getLogs(): Promise<Log[]> {
        return await this.logRepository.findAll()
    }
    async queryBySql(): Promise<Log[]> {
        return await this.sequelize.query(`select * from log`)
    }
}
