import { Test, TestingModule } from '@nestjs/testing';
import { TestParameterService } from './test-parameter.service';

describe('TestParameterService', () => {
  let service: TestParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestParameterService],
    }).compile();

    service = module.get<TestParameterService>(TestParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
