import { Test, TestingModule } from '@nestjs/testing';
import { TestProjectController } from './test-project.controller';
import { TestProjectService } from './test-project.service';

describe('TestProjectController', () => {
  let controller: TestProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestProjectController],
      providers: [TestProjectService],
    }).compile();

    controller = module.get<TestProjectController>(TestProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
