import { Injectable, Inject } from '@nestjs/common';
import { default as Log } from './log.entity';
import { Sequelize, QueryTypes } from 'sequelize';

@Injectable()
export class LogService {
    constructor(
        @Inject('LogRepository') private readonly logRepository: typeof Log,
        @Inject('Sequelize') private readonly sequelize: Sequelize
    ) { }
    async getLogs(p: number): Promise<Log[]> {
        if (p == 1) {
            throw new Error('这是log.service抛出的异常');
        }
        return await this.logRepository.findAll();
    }
    async queryBySql(): Promise<Log[]> {
        return await this.sequelize.query(`select * from log`, {
            type: QueryTypes.SELECT,
        });
    }
}
