import { Test, TestingModule } from '@nestjs/testing';
import { TestStepService } from './test-step.service';

describe('TestStepService', () => {
  let service: TestStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestStepService],
    }).compile();

    service = module.get<TestStepService>(TestStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
