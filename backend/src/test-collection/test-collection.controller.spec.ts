import { Test, TestingModule } from '@nestjs/testing';
import { TestCollectionController } from './test-collection.controller';
import { TestCollectionService } from './test-collection.service';

describe('TestCollectionController', () => {
  let controller: TestCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCollectionController],
      providers: [TestCollectionService],
    }).compile();

    controller = module.get<TestCollectionController>(TestCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
