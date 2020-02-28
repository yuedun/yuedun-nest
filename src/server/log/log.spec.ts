import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { LogModule } from './log.module';

describe('LogController', () => {
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
    it('findAll', async() => {
        expect(await appController.findAll()).toBe(new Error('这是log.service抛出的异常'));
    });
    it('findAllBySql', async() => {
        expect(await appController.findAllBySql()).toBeDefined();
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
