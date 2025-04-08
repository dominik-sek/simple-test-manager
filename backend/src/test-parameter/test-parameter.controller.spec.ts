import { Test, TestingModule } from '@nestjs/testing';
import { TestParameterController } from './test-parameter.controller';
import { TestParameterService } from './test-parameter.service';

describe('TestParameterController', () => {
  let controller: TestParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestParameterController],
      providers: [TestParameterService],
    }).compile();

    controller = module.get<TestParameterController>(TestParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
