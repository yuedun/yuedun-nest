import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './libs/mylog.module';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [LoggerModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appService = module.get<AppService>(AppService);
        appController = module.get<AppController>(AppController);
    });

    it('should return "Hello World!"', () => {
        expect(appController.root()).toBe('Hello World!');
    });
    
    it('should return "Hello World!"', () => {
        expect(appService.root()).toBe('Hello World!');
    });;
});
