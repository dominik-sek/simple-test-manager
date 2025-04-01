import { Module } from '@nestjs/common';
import { TestStepService } from './test-step.service';
import { TestStepController } from './test-step.controller';

@Module({
  controllers: [TestStepController],
  providers: [TestStepService],
})
export class TestStepModule {}
