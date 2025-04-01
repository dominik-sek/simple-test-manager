import { Module } from '@nestjs/common';
import { TestCollectionService } from './test-collection.service';
import { TestCollectionController } from './test-collection.controller';

@Module({
  controllers: [TestCollectionController],
  providers: [TestCollectionService],
})
export class TestCollectionModule {}
