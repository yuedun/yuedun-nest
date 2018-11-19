import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';

describe('Payment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PaymentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PaymentController = module.get<PaymentController>(PaymentController);
    expect(controller).toBeDefined();
  });
});
