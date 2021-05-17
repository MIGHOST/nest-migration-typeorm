import { Test, TestingModule } from '@nestjs/testing';
import { UtlController } from './utl.controller';

describe('UtlController', () => {
  let controller: UtlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtlController],
    }).compile();

    controller = module.get<UtlController>(UtlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
