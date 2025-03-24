import { Module } from '@nestjs/common';
import { TestSuiteService } from './test-suite.service';
import { TestSuiteController } from './test-suite.controller';

@Module({
  controllers: [TestSuiteController],
  providers: [TestSuiteService],
})
export class TestSuiteModule {}
