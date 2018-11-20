import { Injectable, Inject } from '@nestjs/common';
import { Log } from './log.entity';

@Injectable()
export class LogService {
    constructor(
        @Inject('LogRepository') private readonly logRepository: typeof Log,
    ) { }
    async getLogs(): Promise<Log[]> {
        return await this.logRepository.findAll()
    }
}
