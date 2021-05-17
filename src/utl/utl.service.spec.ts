import { Test, TestingModule } from '@nestjs/testing';
import { UtlService } from './utl.service';

describe('UtlService', () => {
  let service: UtlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtlService],
    }).compile();

    service = module.get<UtlService>(UtlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
