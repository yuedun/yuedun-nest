import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';

describe('Payment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LogController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LogController = module.get<LogController>(LogController);
    expect(controller).toBeDefined();
  });
});
