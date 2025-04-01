import { Test, TestingModule } from '@nestjs/testing';
import { TestProjectService } from './test-project.service';

describe('TestProjectService', () => {
  let service: TestProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestProjectService],
    }).compile();

    service = module.get<TestProjectService>(TestProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
