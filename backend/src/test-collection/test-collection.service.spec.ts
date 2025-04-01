import { Test, TestingModule } from '@nestjs/testing';
import { TestCollectionService } from './test-collection.service';

describe('TestCollectionService', () => {
  let service: TestCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCollectionService],
    }).compile();

    service = module.get<TestCollectionService>(TestCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
