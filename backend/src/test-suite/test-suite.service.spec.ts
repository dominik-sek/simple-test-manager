import { Test, TestingModule } from '@nestjs/testing';
import { TestSuiteService } from './test-suite.service';

describe('TestSuiteService', () => {
  let service: TestSuiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSuiteService],
    }).compile();

    service = module.get<TestSuiteService>(TestSuiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
