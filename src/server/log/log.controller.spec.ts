import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LogModule } from './log.module';
import { async } from 'rxjs/internal/scheduler/async';

describe('AppController', () => {
    let app: TestingModule;
    let appController: LogController;
    beforeEach(async () => {
        app = await Test.createTestingModule({
            imports: [LogModule],
            // controllers: [LogController],
            // providers: [LogService],
        }).compile();
        appController = app.get<LogController>(LogController);
    });

    it('should be defined', () => {
        expect(appController).toBeDefined();
    });
});

describe('LogService', () => {
    let service: LogService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [LogModule],
        }).compile();
        service = module.get<LogService>(LogService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('get data', async () => {
        let data = await service.queryBySql();
        expect(data).not.toBeNull();
    });
});
