import { Module } from '@nestjs/common';
import { TestParameterService } from './test-parameter.service';
import { TestParameterController } from './test-parameter.controller';

@Module({
  controllers: [TestParameterController],
  providers: [TestParameterService],
})
export class TestParameterModule {}
