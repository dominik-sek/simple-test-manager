import { Test, TestingModule } from '@nestjs/testing';
import { TestStepController } from './test-step.controller';
import { TestStepService } from './test-step.service';

describe('TestStepController', () => {
  let controller: TestStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestStepController],
      providers: [TestStepService],
    }).compile();

    controller = module.get<TestStepController>(TestStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
