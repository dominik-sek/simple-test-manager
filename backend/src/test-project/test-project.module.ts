import { Module } from '@nestjs/common';
import { TestProjectService } from './test-project.service';
import { TestProjectController } from './test-project.controller';

@Module({
  controllers: [TestProjectController],
  providers: [TestProjectService],
})
export class TestProjectModule {}
