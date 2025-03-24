import { Test, TestingModule } from '@nestjs/testing';
import { TestSuiteController } from './test-suite.controller';
import { TestSuiteService } from './test-suite.service';

describe('TestSuiteController', () => {
  let controller: TestSuiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSuiteController],
      providers: [TestSuiteService],
    }).compile();

    controller = module.get<TestSuiteController>(TestSuiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
