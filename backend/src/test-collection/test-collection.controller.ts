import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TestCollectionService } from './test-collection.service';
import { CreateTestCollectionDto } from './dto/create-test-collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test-collection.dto';
import { AddTestCasesToCollectionDto } from './dto/add-test-cases-to-test-collection.dto';

@Controller('test-collection')
export class TestCollectionController {
  constructor(private readonly testCollectionService: TestCollectionService) {}

  @Post()
  create(@Body() createTestCollectionDto: CreateTestCollectionDto) {
    return this.testCollectionService.create(createTestCollectionDto);
  }

  @Get()
  findAll() {
    return this.testCollectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCollectionService.findOne(+id);
  }
  @Post('cases/:id')
  addCasesToCollection(
    @Param('id', ParseIntPipe) collectionId: number,
    @Body() addTestCasesToCollectionDto: AddTestCasesToCollectionDto
  ){
    return this.testCollectionService.addCases(collectionId, addTestCasesToCollectionDto.testCaseIds)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestCollectionDto: UpdateTestCollectionDto) {
    return this.testCollectionService.update(+id, updateTestCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCollectionService.remove(+id);
  }
}
